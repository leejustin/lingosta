import { Language, Term } from "./types";
export interface RawTermResponse {
    "a": string;
    "b": string;
    "weight": number;
}
export interface RawTranslationResponse {
    t: RawTermResponse[];
}
export interface TranslationResponse {
    type: Language;
    sentence: string;
    terms: Term[];
}
export interface TranslationRequest {
    type: Language;
    sentence: string;
}
