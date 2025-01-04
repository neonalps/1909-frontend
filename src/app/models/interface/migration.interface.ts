export interface MigrationDaoInterface {
    id: string;
    sql: string;
    error_message?: string;
}