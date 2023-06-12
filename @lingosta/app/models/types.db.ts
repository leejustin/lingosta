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

// Maps 1:1 in fields in Appwrite in `sessions` collection. Fields are deconstructed since Appwrite doesn't support objects.
export interface DBSessionFields {
  owner_id: string;
  group_id: string;
  source_translations: string[];
  target_translations: string[];
  translation_weights: number[];
  progress: number[];
}

export type DBSession = DBSessionFields & Models.Document;

// Maps 1:1 in fields in Appwrite in `jumbles` collection.
export interface DBJumbleFields {
    owner_id: string,
    source_group_ids: string[],
    process_id: string,
    answer: string[],
    prompt: string[],
    translation_weights: number[],
    options: string[],
    is_reversed: boolean,
}

export type DBJumble = DBJumbleFields & Models.Document;

// Maps 1:1 in fields in Appwrite in `jumble_sessions` collection.
export interface DBJumbleSubmissionFields {
    owner_id: string,
    jumble_id: string,
    submission: string[],
    is_correct: boolean,
}

export type DBJumbleSubmission = DBJumbleSubmissionFields & Models.Document;