import {Language} from "./types";

// This is used to map the Language enum to a human-readable format.
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