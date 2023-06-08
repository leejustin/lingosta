import { databases } from '../helpers/AppwriteHelper';
import {DBJumble, deserializeJumble, serializeJumble, UserJumble} from "../../common";
import {Models, Query} from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS;
const JUMBLES_COLLECTION_ID = process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_JUMBLES;

export const getUserJumbles = async (userId: string, groupIds?: string[]): Promise<UserJumble[]> => {
  let query = [Query.equal("owner_id", userId)];
  if (groupIds !== undefined) {
    query = query.concat(groupIds.map((groupId) => Query.search("group_id", groupId)));
  }

  const response: Models.DocumentList<DBJumble> = await databases.listDocuments(
    DATABASE_ID,
    JUMBLES_COLLECTION_ID,
    query,
  );

  return response.documents.map((dbs: DBJumble) => deserializeJumble(dbs));
}

export const getJumble = async (jumbleId: string): Promise<UserJumble> => {
const result = await databases.getDocument(DATABASE_ID, JUMBLES_COLLECTION_ID, jumbleId);
  if (result) {
    return deserializeJumble(result as DBJumble);
  } else {
    throw new Error(`Jumble ${jumbleId} was not found`)
  }
}
