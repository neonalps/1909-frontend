export interface PersonDaoInterface {
    id: string;
    last_name: string;
    first_name: string;
    portrait: Uint8Array;
    birthday: Date;
}