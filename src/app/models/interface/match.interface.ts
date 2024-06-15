export interface MatchDaoInterface {
    id: string;
    season_id: string;
    competition_id: string;
    competition_round: string;
    opponent_id: string;
    scheduled_at: Date;
    status: string;
    venue_id: string;
    is_home_team: number;
    full_time_goals_main: number;
    full_time_goals_opponent: number;
    half_time_goals_main: number;
    half_time_goals_opponent: number;
    attendance: number;
    is_sold_out: number;
    multi_leg: number;
    previous_leg_match_id: string;
    aet_goals_main: number;
    aet_goals_opponent: number;
    pso_goals_main: number;
    pso_goals_opponent: number;
    is_friendly_game: number;
}