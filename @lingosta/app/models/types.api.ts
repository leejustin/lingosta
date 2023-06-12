import {Language, Term} from "./types";

// RawTermResponse is a shorter version of Term, used to reduce OpenAPI JSON payload size
export interface RawTermResponse {
  "a": string;
  "b": string;
  "weight": number;
}

// RawTranslationResponse is a shorter version of RawTermResponse, used to reduce response payload size
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
