// Removes punctuation from a word. This may be revisited to make it language-specific.
import {Language} from "./types";
import {RawTranslationResponse, TranslationResponse} from "./types.api";

const removePunctuation = (sentence: string): string => {
  if (!sentence) {
    return "";
  }

  const matches = sentence.match(/[^_\W]+/g);
  if (!matches) {
    return ""
  } else {
    return matches.join(' ');
  }
}

export const mapRawTranslation = (sentence: string, rawTranslation: RawTranslationResponse, language: Language): TranslationResponse => {
  const terms = rawTranslation.t.map((rawTerm) => ({
    source: removePunctuation(rawTerm.a),
    target: removePunctuation(rawTerm.b),
    weight: rawTerm.weight / 10,
  })).filter(
    (term) => term.source !== "" && term.target !== ""
  );

  return {
    type: language,
    sentence: sentence,
    terms: terms,
  };
}