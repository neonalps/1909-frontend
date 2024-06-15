import { CompetitionDaoInterface } from "@src/app/models/interface/competition.interface";
import { convertNumberToBoolean } from "@src/app/util/common";

export class CompetitionDao {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _logo!: Uint8Array;
    private _isDomestic!: boolean;
    private _tablePositionOffset!: number;
    private _parentId!: string;
 
    constructor(builder: CompetitionDaoBuilder) {
       this._id = builder.id;
       this._name = builder.name;
       this._shortName = builder.shortName;
       this._logo = builder.logo;
       this._isDomestic = builder.isDomestic;
       this._tablePositionOffset = builder.tablePositionOffset;
       this._parentId = builder.parentId;
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
 
    public get logo(): Uint8Array {
       return this._logo;
    }
 
    public get isDomestic(): boolean {
       return this._isDomestic;
    }
 
    public get tablePositionOffset(): number {
       return this._tablePositionOffset;
    }
 
    public get parentId(): string {
       return this._parentId;
    }
 
    public static get Builder(): CompetitionDaoBuilder {
       return new CompetitionDaoBuilder();
    }

    public static fromDaoInterface(item: CompetitionDaoInterface): CompetitionDao {
        return this.Builder
            .withId(item.id)
            .withName(item.name)
            .withShortName(item.short_name)
            .withLogo(item.logo)
            .withIsDomestic(convertNumberToBoolean(item.is_domestic))
            .withTablePositionOffset(item.table_position_offset)
            .withParentId(item.parent_id)
            .build();
    }
 }
 
 class CompetitionDaoBuilder {
    private _id!: string;
    private _name!: string;
    private _shortName!: string;
    private _logo!: Uint8Array;
    private _isDomestic!: boolean;
    private _tablePositionOffset!: number;
    private _parentId!: string;
 
    public withId(id: string): CompetitionDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withName(name: string): CompetitionDaoBuilder {
       this._name = name;
       return this;
    }
 
    public withShortName(shortName: string): CompetitionDaoBuilder {
       this._shortName = shortName;
       return this;
    }
 
    public withLogo(logo: Uint8Array): CompetitionDaoBuilder {
       this._logo = logo;
       return this;
    }
 
    public withIsDomestic(isDomestic: boolean): CompetitionDaoBuilder {
       this._isDomestic = isDomestic;
       return this;
    }
 
    public withTablePositionOffset(tablePositionOffset: number): CompetitionDaoBuilder {
       this._tablePositionOffset = tablePositionOffset;
       return this;
    }
 
    public withParentId(parentId: string): CompetitionDaoBuilder {
       this._parentId = parentId;
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
 
    public get logo(): Uint8Array {
       return this._logo;
    }
 
    public get isDomestic(): boolean {
       return this._isDomestic;
    }
 
    public get tablePositionOffset(): number {
       return this._tablePositionOffset;
    }
 
    public get parentId(): string {
       return this._parentId;
    }
 
    build(): CompetitionDao {
       return new CompetitionDao(this);
    }
 }