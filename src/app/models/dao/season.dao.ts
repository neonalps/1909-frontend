import { SyncableEntity } from "@src/app/models/dao/syncable-entity";

export interface SeasonDao extends SyncableEntity {
   name: string;
   shortName: string;
   from: Date;
   to: Date;
}