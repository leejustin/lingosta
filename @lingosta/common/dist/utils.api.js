"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRawTranslation = void 0;
const removePunctuation = (sentence) => {
    if (!sentence) {
        return "";
    }
    return sentence.replace(/[^\p{L}\p{N}\s-]|(?<=\p{L})-(?=\p{L})/gu, '').replace(/\s+/g, ' ');
};
const mapRawTranslation = (sentence, rawTranslation, language) => {
    const terms = rawTranslation.t.map((rawTerm) => ({
        source: removePunctuation(rawTerm.a),
        target: removePunctuation(rawTerm.b),
        weight: rawTerm.weight / 10,
    })).filter((term) => term.source !== "" && term.target !== "");
    return {
        type: language,
        sentence: sentence,
        terms: terms,
    };
};
exports.mapRawTranslation = mapRawTranslation;
