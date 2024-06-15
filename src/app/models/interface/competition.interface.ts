export interface CompetitionDaoInterface {
    id: string;
    name: string;
    short_name: string;
    logo: Uint8Array;
    is_domestic: number;
    table_position_offset: number;
    parent_id: string;
}