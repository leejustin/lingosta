export enum Language {
  SPANISH = "es",
  BRAZILIAN_PORTUGUESE = "pt",
  ENGLISH = "en",
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

// SessionStatus tracks the result of a flash card session
export enum SessionStatus {
  CORRECT = 0,
  INCORRECT = 1,
  PASS = 2,
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

// UserSession is used to store the user's session when they practice translations in a group
export interface UserSession {
  ownerId: string,
  groupId: string,
  terms: Term[],
  progress: SessionStatus[],
  id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

// UserJumble is used to store the user's jumble when they practice jumbles in a group
export interface UserJumble {
    ownerId: string,
    sourceGroupIds: string[],
    processId: string,
    terms: Term[],
    options: string[],
    isReversed: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

// JumbleSubmission is used to store the user's jumble sessions when they practice
export interface UserJumbleSubmission {
    ownerId: string,
    jumbleId: string,
    submission: string[],
    isCorrect: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
}