"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageEmoji = exports.getLanguageName = void 0;
const types_1 = require("./types");
// This is used to map the Language enum to a human-readable format.
const getLanguageName = (lang) => {
    switch (lang) {
        case types_1.Language.SPANISH:
            return "Spanish";
        case types_1.Language.BRAZILIAN_PORTUGUESE:
            return "Brazilian Portuguese";
        case types_1.Language.ENGLISH:
            return "English";
        case types_1.Language.KOREAN:
            return "Korean";
        case types_1.Language.FRENCH:
            return "French";
        case types_1.Language.GERMAN:
            return "German";
        case types_1.Language.ITALIAN:
            return "Italian";
        case types_1.Language.DUTCH:
            return "Dutch";
        case types_1.Language.RUSSIAN:
            return "Russian";
        case types_1.Language.CHINESE:
            return "Chinese";
        case types_1.Language.JAPANESE:
            return "Japanese";
        default:
            return "Unknown";
    }
};
exports.getLanguageName = getLanguageName;
const getLanguageEmoji = (lang) => {
    switch (lang) {
        case types_1.Language.SPANISH:
            return "🇪🇸";
        case types_1.Language.BRAZILIAN_PORTUGUESE:
            return "🇧🇷";
        case types_1.Language.ENGLISH:
            return "🇺🇸"; // Changed from 🇬🇧 to 🇺🇸
        case types_1.Language.KOREAN:
            return "🇰🇷";
        case types_1.Language.FRENCH:
            return "🇫🇷";
        case types_1.Language.GERMAN:
            return "🇩🇪";
        case types_1.Language.ITALIAN:
            return "🇮🇹";
        case types_1.Language.DUTCH:
            return "🇳🇱";
        case types_1.Language.RUSSIAN:
            return "🇷🇺";
        case types_1.Language.CHINESE:
            return "🇨🇳";
        case types_1.Language.JAPANESE:
            return "🇯🇵";
        default:
            return "❓";
    }
};
exports.getLanguageEmoji = getLanguageEmoji;
