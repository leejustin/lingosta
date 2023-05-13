import {Language, RawTranslation, Translation} from "./types";

export const mapRawTranslation = (sentence: string, rawTranslation: RawTranslation, language: Language): Translation => {
  const terms = rawTranslation.t.map((rawTerm) => ({
    source: rawTerm.a,
    target: rawTerm.b,
    weight: rawTerm.weight,
  }));

  return {
    type: language,
    sentence: sentence,
    terms: terms,
  };
}
