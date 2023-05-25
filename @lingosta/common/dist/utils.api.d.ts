import { Language } from "./types";
import { RawTranslationResponse, TranslationResponse } from "./types.api";
export declare const mapRawTranslation: (sentence: string, rawTranslation: RawTranslationResponse, language: Language) => TranslationResponse;
