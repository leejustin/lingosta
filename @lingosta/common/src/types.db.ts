import {Models} from "appwrite";

// Maps 1:1 in fields in Appwrite in `translations` collection. Fields are deconstructed since Appwrite doesn't support objects.
export interface DBTranslationFields {
  owner_id: string;
  group_id: string;
  source_translations: string[];
  target_translations: string[];
  translation_weights: number[];
  raw_data: string;
  source_language: string
}

// DBTranslation is used to map data that is retrieved from Appwrite.
export type DBTranslation = DBTranslationFields & Models.Document;

// Maps 1:1 in fields in Appwrite in `groups` collection.
export interface DBGroupFields {
  name: string,
  owner_id: string,
  language: string,
}

export type DBGroup = DBGroupFields & Models.Document;
