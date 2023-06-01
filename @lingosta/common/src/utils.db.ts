import {Language, SessionStatus, Term, UserGroup, UserSession, UserTranslation} from "./types";
import {DBGroup, DBGroupFields, DBSession, DBSessionFields, DBTranslation, DBTranslationFields} from "./types.db";

// We store some data in Appwrite in a deconstructed format because of the inability to
// store objects. So this function is used to map it into a usable format for consumption.
export const deserializeTranslation = (t: DBTranslation): UserTranslation => {
  const terms: Term[] = []
  for (let i = 0; i < t["source_translations"].length; i++) {
    terms.push({
      source: t["source_translations"][i],
      target: t["target_translations"][i],
      weight: t["translation_weights"][i],
    })
  }

  return {
    id: t["$id"],
    createdAt: new Date(t["$createdAt"]),
    updatedAt: new Date(t["$updatedAt"]),
    ownerId: t["owner_id"],
    groupId: t["group_id"],
    terms: terms,
    rawData: t["raw_data"] as string,
    sourceLanguage: t["source_language"] as Language,
  }
}

// Since Appwrite doesn't like documents with internal fields (eg. $id) made available, we need
// to use the deconstructed format when saving to Appwrite.
// This will return an ID if we are updating a document and an undefined ID for new documents.
export const serializeTranslation = (t: UserTranslation): [DBTranslationFields, string?] => {
  const source_translations: string[] = [];
  const target_translations: string[] = [];
  const translation_weights: number[] = [];

  t.terms.forEach((term: Term) => {
    source_translations.push(term.source);
    target_translations.push(term.target);
    translation_weights.push(term.weight);
  });

  const dbTranslation: DBTranslationFields = {
    owner_id: t.ownerId,
    group_id: t.groupId,
    source_translations: source_translations,
    target_translations: target_translations,
    translation_weights: translation_weights,
    raw_data: t.rawData,
    source_language: t.sourceLanguage as string,
  }

  return [dbTranslation, t.id];
}

// This will return an ID if we are updating a document and an undefined ID for new documents.
export const deserializeGroup = (group: DBGroup): UserGroup => {
  return {
    id: group["$id"],
    createdAt: new Date(group["$createdAt"]),
    updatedAt: new Date(group["$updatedAt"]),
    name: group["name"],
    ownerId: group["owner_id"],
    language: group["language"] as Language,
  }
}

export const serializeGroup = (group: UserGroup): [DBGroupFields, string?] => {
  const dbGroup: DBGroupFields = {
    name: group.name,
    owner_id: group.ownerId,
    language: group.language as string,
  }
  return [dbGroup, group.id];
}

export const deserializeSession = (s: DBSession): UserSession => {
  const terms: Term[] = []
  for (let i = 0; i < s["source_translations"].length; i++) {
    terms.push({
      source: s["source_translations"][i],
      target: s["target_translations"][i],
      weight: s["translation_weights"][i],
    })
  }

  return {
    id: s["$id"],
    createdAt: new Date(s["$createdAt"]),
    updatedAt: new Date(s["$updatedAt"]),
    ownerId: s["owner_id"],
    groupId: s["group_id"],
    terms: terms,
    progress: s["progress"].map((p: number) => p as SessionStatus),
  }
}

export const serializeSession = (s: UserSession): [DBSessionFields, string?] => {
  const source_translations: string[] = [];
  const target_translations: string[] = [];
  const translation_weights: number[] = [];

  s.terms.forEach((term: Term) => {
    source_translations.push(term.source);
    target_translations.push(term.target);
    translation_weights.push(term.weight);
  });

  const dbSession: DBSessionFields = {
    owner_id: s.ownerId,
    group_id: s.groupId,
    source_translations: source_translations,
    target_translations: target_translations,
    translation_weights: translation_weights,
    progress: s.progress.map((p: SessionStatus) => p as number),
  }

  return [dbSession, s.id];
}
