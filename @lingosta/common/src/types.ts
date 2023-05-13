export enum Language {
  SPANISH = "es",
  BRAZILIAN_PORTUGUESE = "pt-BR",
  ENGLISH = "en",
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
