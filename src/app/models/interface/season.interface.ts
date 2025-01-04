export interface SeasonDaoInterface {
    id: string;
    name: string;
    short_name: string;
    from_: string;
    to_: string;
    tombstone?: boolean;
}