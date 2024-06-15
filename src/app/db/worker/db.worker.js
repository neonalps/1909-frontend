import initSqlJs from '@jlongster/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend';

let db = null;
let isTransactionOpen = false;

async function init() {
    const SQL = await initSqlJs({ locateFile: file => `assets/${file}` });
    const sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
    SQL.register_for_idb(sqlFS);

    SQL.FS.mkdir('/sql');
    SQL.FS.mount(sqlFS, {}, '/sql');

    const path = '/sql/db.sqlite';
    if (typeof SharedArrayBuffer === 'undefined') {
        const stream = SQL.FS.open(path, 'a+');
        await stream.node.contents.readIfFallback();
        SQL.FS.close(stream);
    }

    db = new SQL.Database(path, { filename: true });
    db.exec(`
        PRAGMA page_size=8192;
        PRAGMA journal_mode=MEMORY;
    `);
}

const performQueryWithParams = (query, params) => {
    const statement = db.prepare(query);
    statement.bind(params);

    const results = [];
    while (statement.step()) {
        results.push(statement.getAsObject());
    }
    statement.free();

    return results;
};

if (typeof self !== 'undefined') {
    self.onmessage = async event => {
        const messageData = event.data;
        if (!messageData) {
            console.error(`No message data found`);
        }
    
        const messageId = messageData.id;
        const messageType = messageData.type;
        const messagePayload = messageData.payload;
    
        try {
            let result;

            if (!db) {
                await init();
            }

            if (messageType === "parameterized") {
                result = performQueryWithParams(messagePayload.query, messagePayload.params || {});
            } else if (messageType === "transaction") {
                if (isTransactionOpen) {
                    throw new Error(`A transaction is already open`);
                }

                isTransactionOpen = true;
                db.exec(`BEGIN TRANSACTION`);
                for (const parameterizedQuery of messagePayload) {
                    const hasParams = parameterizedQuery.params !== undefined;
                    if (hasParams) {
                        db.prepare(parameterizedQuery.query).run(parameterizedQuery.params);
                    } else {
                        db.exec(parameterizedQuery.query);
                    }
                }
                db.exec(`COMMIT`);
                isTransactionOpen = false;
            } else if (messageType === "raw") {
                result = db.exec(messagePayload.query);
            }   
            
            postMessage({
                id: messageId,
                type: "result",
                payload: result,
            });
        } catch (ex) {
            if (isTransactionOpen) {
                db.exec(`ROLLBACK`);
                isTransactionOpen = false;
            }
    
            postMessage({
                id: messageId,
                type: "error",
                payload: {
                    message: ex.message,
                }
            });
        }
    };
}