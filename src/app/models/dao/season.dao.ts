import { SeasonDaoInterface } from "@src/app/models/interface/season.interface";
import { convertDateStringToDate } from "@src/app/util/common";

export class SeasonDao {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _from!: Date;
    private _to!: Date;
 
    constructor(builder: SeasonDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._shortName = builder.shortName;
       this._from = builder.from;
       this._to = builder.to;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get shortName(): string {
       return this._shortName;
    }
 
    public get from(): Date {
       return this._from;
    }
 
    public get to(): Date {
       return this._to;
    }
 
    public static get Builder(): SeasonDaoBuilder {
       return new SeasonDaoBuilder();
    }
    
    public static fromDaoInterface(item: SeasonDaoInterface): SeasonDao {
        return this.Builder
            .withId(item.id)
            .withName(item.name)
            .withShortName(item.short_name)
            .withFrom(convertDateStringToDate(item.from_))
            .withTo(convertDateStringToDate(item.to_))
            .build();
    }
}
 
 class SeasonDaoBuilder {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _from!: Date;
    private _to!: Date;
 
    public withId(id: string): SeasonDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): SeasonDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withShortName(shortName: string): SeasonDaoBuilder {
       this._shortName = shortName;
       return this;
    }
 
    public withFrom(from: Date): SeasonDaoBuilder {
       this._from = from;
       return this;
    }
 
    public withTo(to: Date): SeasonDaoBuilder {
       this._to = to;
       return this;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get shortName(): string {
       return this._shortName;
    }
 
    public get from(): Date {
       return this._from;
    }
 
    public get to(): Date {
       return this._to;
    }
 
    build(): SeasonDao {
       return new SeasonDao(this);
    }
}