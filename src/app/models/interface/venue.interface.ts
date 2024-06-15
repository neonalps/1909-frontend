export interface VenueDaoInterface {
    id: string;
    name: string;
    lat: number;
    lng: number;
    country_code: string;
    capacity: number;
    parent_id: string;
}