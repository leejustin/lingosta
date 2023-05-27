export declare enum Language {
    SPANISH = "es",
    BRAZILIAN_PORTUGUESE = "pt-br",
    ENGLISH = "en",
    FRENCH = "fr",
    GERMAN = "de",
    ITALIAN = "it",
    DUTCH = "nl",
    RUSSIAN = "ru",
    CHINESE = "zh",
    JAPANESE = "ja",
    KOREAN = "ko"
}
export interface Term {
    source: string;
    target: string;
    weight: number;
}
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
export interface UserGroup {
    name: string;
    ownerId: string;
    language: Language;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
