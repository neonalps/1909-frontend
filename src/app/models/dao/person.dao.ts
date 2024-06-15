import { PersonDaoInterface } from "@src/app/models/interface/person.interface";

export class PersonDao {
    private _id!: string;
    private _lastName!: string;
    private _firstName!: string;
    private _birthday!: Date;
    private _portrait!: Uint8Array;
 
    constructor(builder: PersonDaoBuilder) {
       this._id = builder.id;
       this._lastName = builder.lastName;
       this._firstName = builder.firstName;
       this._birthday = builder.birthday;
       this._portrait = builder.portrait;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get lastName(): string {
       return this._lastName;
    }
 
    public get firstName(): string {
       return this._firstName;
    }
 
    public get birthday(): Date {
       return this._birthday;
    }
 
    public get portrait(): Uint8Array {
       return this._portrait;
    }
 
    public static get Builder(): PersonDaoBuilder {
       return new PersonDaoBuilder();
    }

    public static fromDaoInterface(item: PersonDaoInterface): PersonDao {
        return this.Builder
            .withId(item.id)
            .withLastName(item.last_name)
            .withFirstName(item.first_name)
            .withPortrait(item.portrait)
            .withBirthday(item.birthday)
            .build();
    }
 }
 
 class PersonDaoBuilder {
    private _id!: string;
    private _lastName!: string;
    private _firstName!: string;
    private _birthday!: Date;
    private _portrait!: Uint8Array;
 
    public withId(id: string): PersonDaoBuilder {
       this._id = id;
       return this;
    }
 
    public withLastName(lastName: string): PersonDaoBuilder {
       this._lastName = lastName;
       return this;
    }
 
    public withFirstName(firstName: string): PersonDaoBuilder {
       this._firstName = firstName;
       return this;
    }
 
    public withBirthday(birthday: Date): PersonDaoBuilder {
       this._birthday = birthday;
       return this;
    }
 
    public withPortrait(portrait: Uint8Array): PersonDaoBuilder {
       this._portrait = portrait;
       return this;
    }
 
    public get id(): string {
       return this._id;
    }
 
    public get lastName(): string {
       return this._lastName;
    }
 
    public get firstName(): string {
       return this._firstName;
    }
 
    public get birthday(): Date {
       return this._birthday;
    }
 
    public get portrait(): Uint8Array {
       return this._portrait;
    }
 
    build(): PersonDao {
       return new PersonDao(this);
    }
 }