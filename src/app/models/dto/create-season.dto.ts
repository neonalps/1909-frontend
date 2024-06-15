export class CreateSeasonDto {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _from!: Date;
    private _to!: Date;
 
    constructor(builder: CreateSeasonDtoBuilder) {
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
 
    public static get Builder(): CreateSeasonDtoBuilder {
       return new CreateSeasonDtoBuilder();
    }
 }
 
 class CreateSeasonDtoBuilder {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _from!: Date;
    private _to!: Date;
 
    public withId(id: string): CreateSeasonDtoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): CreateSeasonDtoBuilder {
       this._name = name;
       return this;
    }
 
    public withShortName(shortName: string): CreateSeasonDtoBuilder {
       this._shortName = shortName;
       return this;
    }
 
    public withFrom(from: Date): CreateSeasonDtoBuilder {
       this._from = from;
       return this;
    }
 
    public withTo(to: Date): CreateSeasonDtoBuilder {
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
 
    build(): CreateSeasonDto {
       return new CreateSeasonDto(this);
    }
 }