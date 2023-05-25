import { Models } from "appwrite";
export interface DBTranslationFields {
    owner_id: string;
    group_id: string;
    source_translations: string[];
    target_translations: string[];
    translation_weights: number[];
    raw_data: string;
    source_language: string;
}
export type DBTranslation = DBTranslationFields & Models.Document;
export interface DBGroupFields {
    name: string;
    owner_id: string;
    language: string;
}
export type DBGroup = DBGroupFields & Models.Document;
