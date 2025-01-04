export interface MigrationDao {
   id: string;
   sql: string;
   errorMessage?: string;
}