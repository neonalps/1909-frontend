import { ClubDaoInterface } from "@src/app/models/interface/club.interface";
import { convertNumberToBoolean } from "@src/app/util/common";

export class ClubDao {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _countryCode!: string;
    private _primaryColour!: string;
    private _secondaryColour!: string;
    private _isMain!: boolean;
    private _venueId!: string;
    private _logo!: Uint8Array;
 
    constructor(builder: ClubDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._shortName = builder.shortName;
       this._countryCode = builder.countryCode;
       this._primaryColour = builder.primaryColour;
       this._secondaryColour = builder.secondaryColour;
       this._isMain = builder.isMain;
       this._venueId = builder.venueId;
       this._logo = builder.logo;
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
 
    public get countryCode(): string {
       return this._countryCode;
    }
 
    public get primaryColour(): string {
       return this._primaryColour;
    }
 
    public get secondaryColour(): string {
       return this._secondaryColour;
    }
 
    public get isMain(): boolean {
       return this._isMain;
    }

    public get venueId(): string {
      return this._venueId;
    }

    public get logo(): Uint8Array {
      return this._logo;
    }
 
    public static get Builder(): ClubDaoBuilder {
       return new ClubDaoBuilder();
    }

    public static fromDaoInterface(item: ClubDaoInterface): ClubDao {
        return this.Builder
            .withId(item.id)
            .withName(item.name)
            .withShortName(item.short_name)
            .withCountryCode(item.country_code)
            .withPrimaryColour(item.primary_colour)
            .withSecondaryColour(item.secondary_colour)
            .withIsMain(convertNumberToBoolean(item.is_main))
            .withVenueId(item.venue_id)
            .withLogo(item.logo)
            .build();
    }
 }
 
 class ClubDaoBuilder {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _countryCode!: string;
    private _primaryColour!: string;
    private _secondaryColour!: string;
    private _isMain!: boolean;
    private _venueId!: string;
    private _logo!: Uint8Array;
 
    public withId(id: string): ClubDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): ClubDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withShortName(shortName: string): ClubDaoBuilder {
       this._shortName = shortName;
       return this;
    }
 
    public withCountryCode(countryCode: string): ClubDaoBuilder {
       this._countryCode = countryCode;
       return this;
    }
 
    public withPrimaryColour(primaryColour: string): ClubDaoBuilder {
       this._primaryColour = primaryColour;
       return this;
    }
 
    public withSecondaryColour(secondaryColour: string): ClubDaoBuilder {
       this._secondaryColour = secondaryColour;
       return this;
    }
 
    public withIsMain(isMain: boolean): ClubDaoBuilder {
       this._isMain = isMain;
       return this;
    }

    public withVenueId(venueId: string): ClubDaoBuilder {
      this._venueId = venueId;
      return this;
    }

    public withLogo(logo: Uint8Array): ClubDaoBuilder {
      this._logo = logo;
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
 
    public get countryCode(): string {
       return this._countryCode;
    }
 
    public get primaryColour(): string {
       return this._primaryColour;
    }
 
    public get secondaryColour(): string {
       return this._secondaryColour;
    }
 
    public get isMain(): boolean {
       return this._isMain;
    }

    public get venueId(): string {
      return this._venueId;
    }

    public get logo(): Uint8Array {
      return this._logo;
    }
 
    build(): ClubDao {
       return new ClubDao(this);
    }
 }