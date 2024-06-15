export interface MatchPlayerDaoInterface {
    id: string;
    match_id: string;
    person_id: string;
    jersey: number;
    position_key: string;
    is_starting: number;
    minutes_played: number;
    goals_scored: number;
    assists: number;
    own_goals: number;
    yellow_cards: number;
    red_cards: number;
    goals_conceded: number;
    penalties_taken: number;
    penalties_scored: number;
    penalties_faced: number;
    penalties_saved: number;
    is_captain: number;
}