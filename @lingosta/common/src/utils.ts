import {Language, RawTranslation, Translation} from "./types";

// Removes punctuation from a word. This may be revisited to make it language-specific.
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

export const mapRawTranslation = (sentence: string, rawTranslation: RawTranslation, language: Language): Translation => {
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

export const getLanguageName = (lang: Language): string => {
  switch (lang) {
    case Language.SPANISH:
      return "Spanish";
    case Language.BRAZILIAN_PORTUGUESE:
      return "Brazilian Portuguese";
    case Language.ENGLISH:
      return "English";
    case Language.KOREAN:
      return "Korean";
    default:
      return "Unknown";
  }
};