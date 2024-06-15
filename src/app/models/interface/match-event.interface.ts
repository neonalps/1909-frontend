export interface MatchEventDaoInterface {
    id: string;
    match_id: string;
    order: number;
    event_type: string; // goal, yellow_card, second_yellow_card, red_card, penalty_missed, var_decision
    minute: string;
    // goal
    goal_scorer: string;
    assisted_by: string;
    direct_free_kick: number;
    penalty: number;
    own_goal: number;
    // substitution
    player_in: string;
    player_out: string;
    // penalty
    penalty_against: string;
    penalty_saved: number;
    // cards
    recipient: string;
    // var decision
    result: string;
}