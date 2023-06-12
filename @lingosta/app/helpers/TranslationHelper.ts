import { databases } from '../helpers/AppwriteHelper';
import {DBTranslation, deserializeTranslation, serializeTranslation, UserTranslation} from "../models";
import {ID, Models, Query} from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS;
const TRANSLATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_TRANSLATIONS;

export const createTranslation = async (userTranslation: UserTranslation): Promise<UserTranslation> => {
  if (userTranslation.id || userTranslation.createdAt || userTranslation.updatedAt) {
    throw new Error("Cannot create a translation with an ID, createdAt, or updatedAt as these are managed by the database");
  }

  const [requestBody, _] = serializeTranslation(userTranslation);
  const result: DBTranslation = await databases.createDocument(DATABASE_ID, TRANSLATIONS_COLLECTION_ID, ID.unique(), requestBody);

  return deserializeTranslation(result as DBTranslation);
}

// getUserTranslations returns all translations for a given user. If a groupId is provided, it will filter to translations for that group.
export const getUserTranslations = async (userId: string, groupId?: string): Promise<UserTranslation[]> => {
  const query = [Query.equal("owner_id", userId)];
  if (groupId) {
    query.push(Query.equal("group_id", groupId));
  }

  const response: Models.DocumentList<DBTranslation> = await databases.listDocuments(
    DATABASE_ID,
    TRANSLATIONS_COLLECTION_ID,
    query,
  );

 return response.documents.map((dbt: DBTranslation) => deserializeTranslation(dbt));
}

export const getTranslation = async (translationId: string): Promise<UserTranslation> => {
  const result = await databases.getDocument(DATABASE_ID, TRANSLATIONS_COLLECTION_ID, translationId);
  if (result) {
    return deserializeTranslation(result as DBTranslation);
  } else {
    throw new Error(`Translation ${translationId} was not found`)
  }
}

export const deleteTranslation = async (translationId: string): Promise<void> => {
  await databases.deleteDocument(DATABASE_ID, TRANSLATIONS_COLLECTION_ID, translationId);
}
