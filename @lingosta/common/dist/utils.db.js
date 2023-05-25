"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeGroup = exports.deserializeGroup = exports.serializeTranslation = exports.deserializeTranslation = void 0;
// We store some data in Appwrite in a deconstructed format because of the inability to
// store objects. So this function is used to map it into a usable format for consumption.
const deserializeTranslation = (t) => {
    const terms = [];
    for (let i = 0; i < t["source_translations"].length; i++) {
        terms.push({
            source: t["source_translations"][i],
            target: t["target_translations"][i],
            weight: t["translation_weights"][i],
        });
    }
    return {
        id: t["$id"],
        createdAt: new Date(t["$createdAt"]),
        updatedAt: new Date(t["$updatedAt"]),
        ownerId: t["owner_id"],
        groupId: t["group_id"],
        terms: terms,
        rawData: t["rawData"],
        sourceLanguage: t["sourceLanguage"]
    };
};
exports.deserializeTranslation = deserializeTranslation;
// Since Appwrite doesn't like documents with internal fields (eg. $id) made available, we need
// to use the deconstructed format when saving to Appwrite.
// This will return an ID if we are updating a document and an undefined ID for new documents.
const serializeTranslation = (t) => {
    const source_translations = [];
    const target_translations = [];
    const translation_weights = [];
    t.terms.forEach((term) => {
        source_translations.push(term.source);
        target_translations.push(term.target);
        translation_weights.push(term.weight);
    });
    const dbTranslation = {
        owner_id: t.ownerId,
        group_id: t.groupId,
        source_translations: source_translations,
        target_translations: target_translations,
        translation_weights: translation_weights,
        raw_data: t.rawData,
        source_language: t.sourceLanguage,
    };
    return [dbTranslation, t.id];
};
exports.serializeTranslation = serializeTranslation;
// This will return an ID if we are updating a document and an undefined ID for new documents.
const deserializeGroup = (group) => {
    return {
        id: group["$id"],
        createdAt: new Date(group["$createdAt"]),
        updatedAt: new Date(group["$updatedAt"]),
        name: group["name"],
        ownerId: group["owner_id"],
        language: group["language"],
    };
};
exports.deserializeGroup = deserializeGroup;
const serializeGroup = (group) => {
    const dbGroup = {
        name: group.name,
        owner_id: group.ownerId,
        language: group.language,
    };
    return [dbGroup, group.id];
};
exports.serializeGroup = serializeGroup;
