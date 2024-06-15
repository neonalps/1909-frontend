function createTimeoutPromise(delayMs) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delayMs);
    });
}

async function fetchUpstream() {
    const response = await fetch(new Request("http://localhost:1999/sync"));
    if (!response.ok) {
        console.error(await response.text());
        throw new Error(`Received error from upstream`);
    }
    const body = await response.json();
    return body.items;
}

if (typeof self !== 'undefined') {
    self.onmessage = async event => {
        const messageData = event.data;
        if (!messageData) {
            console.error(`No message data found`);
        }
    
        const messageId = messageData.id;
        const messageType = messageData.type;
        const messagePayload = messageData.payload;

        if (messageType === "fetchUpstream") {
            try {
                const upstreamItems = await fetchUpstream();
                
                postMessage({
                    id: messageId,
                    type: "result",
                    payload: {
                        items: upstreamItems,
                    },
                });
            } catch (ex) {
                postMessage({
                    id: messageId,
                    type: "error",
                    payload: {
                        message: ex,
                    },
                });
            }
        }
    }
}