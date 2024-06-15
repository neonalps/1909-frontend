import { SyncDaoInterface } from "@src/app/models/interface/sync.interface";

export class SyncDao {
    private _id!: string;
    private _createdAt!: Date;
    private _query!: string;
    private _error!: string;
 
    constructor(builder: SyncDaoBuilder) {
       this._id = builder.id;
       this._createdAt = builder.createdAt;
       this._query = builder.query;
       this._error = builder.error;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get query(): string {
       return this._query;
    }

    public get error(): string {
        return this._error;
     }

    public toDaoInterface(): SyncDaoInterface {
        return {
            id: this.id,
            created_at: this.createdAt,
            query: this.query,
            error: this.error,
        };
    }
 
    public static get Builder(): SyncDaoBuilder {
       return new SyncDaoBuilder();
    }

    public static fromDaoInterface(item: SyncDaoInterface): SyncDao {
        return this.Builder
            .withId(item.id)
            .withCreatedAt(item.created_at)
            .withQuery(item.query)
            .withError(item.error)
            .build();
    }
 }
 
 class SyncDaoBuilder {
    private _id!: string;
    private _createdAt!: Date;
    private _query!: string;
    private _error!: string;
 
    public withId(id: string): SyncDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withCreatedAt(createdAt: Date): SyncDaoBuilder {
       this._createdAt = createdAt;
       return this;
    }
 
    public withQuery(query: string): SyncDaoBuilder {
       this._query = query;
       return this;
    }

    public withError(error: string): SyncDaoBuilder {
        this._error = error;
        return this;
     }
 
    public get id(): string {
       return this._id;
    }
 
    public get createdAt(): Date {
       return this._createdAt;
    }
 
    public get query(): string {
       return this._query;
    }

    public get error(): string {
        return this._error;
     }
 
    build(): SyncDao {
       return new SyncDao(this);
    }
 }