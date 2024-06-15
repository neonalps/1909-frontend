export interface ClubDaoInterface {
    id: string;
    name: string;
    short_name: string;
    country_code: string;
    primary_colour: string;
    secondary_colour: string;
    is_main: number;
    venue_id: string;
    logo: Uint8Array;
}