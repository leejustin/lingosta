<<<<<<< HEAD
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

=======
import {Language} from "./types";

// This is used to map the Language enum to a human-readable format.
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
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
<<<<<<< HEAD
    default:
      return "Unknown";
  }
};
=======
    case Language.FRENCH:
      return "French";
    case Language.GERMAN:
      return "German";
    case Language.ITALIAN:
      return "Italian";
    case Language.DUTCH:
      return "Dutch";
    case Language.RUSSIAN:
      return "Russian";
    case Language.CHINESE:
      return "Chinese";
    case Language.JAPANESE:
      return "Japanese";
    default:
      return "Unknown";
  }
};
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
