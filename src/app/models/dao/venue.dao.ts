import { VenueDaoInterface } from "@src/app/models/interface/venue.interface";

export class VenueDao {
    private _id!: string;
    private _name!: string;
    private _lat!: number;
    private _lng!: number;
    private _countryCode!: string;
    private _capacity!: number;
    private _parentId!: string;
 
    constructor(builder: VenueDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._lat = builder.lat;
       this._lng = builder.lng;
       this._countryCode = builder.countryCode;
       this._capacity = builder.capacity;
       this._parentId = builder.parentId;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get lat(): number {
       return this._lat;
    }
 
    public get lng(): number {
       return this._lng;
    }
 
    public get countryCode(): string {
       return this._countryCode;
    }
 
    public get capacity(): number {
       return this._capacity;
    }
 
    public get parentId(): string {
       return this._parentId;
    }
 
    public static get Builder(): VenueDaoBuilder {
       return new VenueDaoBuilder();
    }

    public static fromDaoInterface(item: VenueDaoInterface): VenueDao {
        return this.Builder
            .withId(item.id)
            .withName(item.name)
            .withLat(item.lat)
            .withLng(item.lng)
            .withCountryCode(item.country_code)
            .withCapacity(item.capacity)
            .withParentId(item.parent_id)
            .build();
    }
 }
 
 class VenueDaoBuilder {
    private _id!: string;
    private _name!: string;
    private _lat!: number;
    private _lng!: number;
    private _countryCode!: string;
    private _capacity!: number;
    private _parentId!: string;
 
    public withId(id: string): VenueDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): VenueDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withLat(lat: number): VenueDaoBuilder {
       this._lat = lat;
       return this;
    }
 
    public withLng(lng: number): VenueDaoBuilder {
       this._lng = lng;
       return this;
    }
 
    public withCountryCode(countryCode: string): VenueDaoBuilder {
       this._countryCode = countryCode;
       return this;
    }
 
    public withCapacity(capacity: number): VenueDaoBuilder {
       this._capacity = capacity;
       return this;
    }
 
    public withParentId(parentId: string): VenueDaoBuilder {
       this._parentId = parentId;
       return this;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get name(): string {
       return this._name;
    }
 
    public get lat(): number {
       return this._lat;
    }
 
    public get lng(): number {
       return this._lng;
    }
 
    public get countryCode(): string {
       return this._countryCode;
    }
 
    public get capacity(): number {
       return this._capacity;
    }
 
    public get parentId(): string {
       return this._parentId;
    }
 
    build(): VenueDao {
       return new VenueDao(this);
    }
 }