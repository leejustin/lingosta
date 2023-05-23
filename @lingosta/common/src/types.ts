export enum Language {
  SPANISH = "es",
  BRAZILIAN_PORTUGUESE = "pt-BR",
  ENGLISH = "en",
<<<<<<< HEAD
  KOREAN = "ko",
}

// RawTerm is a shorter version of Term, used to reduce OpenAPI JSON payload size
export interface RawTerm {
  "a": string;
  "b": string;
  "weight": number;
}

// RawTranslation is a shorter version of RawTerm, used to reduce OpenAPI JSON payload size
export interface RawTranslation {
  t: RawTerm[];
}

export interface Term {
source: string;
target: string;
weight: number; // range 0.0 - 1.0
}
export interface Translation {
  type: Language;
  sentence: string;
  terms: Term[];
}

export interface TranslationRequest {
  type: Language;
  sentence: string;
}
=======
  FRENCH = "fr",
  GERMAN = "de",
  ITALIAN = "it",
  DUTCH = "nl",
  RUSSIAN = "ru",
  CHINESE = "zh",
  JAPANESE = "ja",
  KOREAN = "ko",
}

export interface Term {
  source: string;
  target: string;
  weight: number; // range 0.0 - 1.0
}

// UserTranslation is the format that has been deserialized to be used in the application.
// Usage: translation: UserTranslation = documentFromAppwriteLibrary.map((t) => formatTranslation(t))
export interface UserTranslation {
  ownerId: string;
  groupId: string;
  terms: Term[];
  rawData: string;
  sourceLanguage: Language;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// UserGroup is used to organize UserTranslations. It's essentially a folder that's tied to a user and language.
// We typically query for groups based off of the `ownerId` field.
// The `UserTranslation.groupId` field is used as the join key between these two collections.
export interface UserGroup {
  name: string,
  ownerId: string,
  language: Language,
  id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
