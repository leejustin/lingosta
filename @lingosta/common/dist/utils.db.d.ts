import { UserGroup, UserTranslation } from "./types";
import { DBGroup, DBGroupFields, DBTranslation, DBTranslationFields } from "./types.db";
export declare const deserializeTranslation: (t: DBTranslation) => UserTranslation;
export declare const serializeTranslation: (t: UserTranslation) => [DBTranslationFields, string?];
export declare const deserializeGroup: (group: DBGroup) => UserGroup;
export declare const serializeGroup: (group: UserGroup) => [DBGroupFields, string?];
