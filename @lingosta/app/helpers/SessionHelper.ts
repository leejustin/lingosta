import { databases } from '../helpers/AppwriteHelper';
import {DBSession, deserializeSession, serializeSession, UserSession} from "../models";
import {ID, Models, Query} from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS;
const SESSIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_SESSIONS;

export const createUserSession = async (userSession: UserSession): Promise<UserSession> => {
  if (userSession.id || userSession.createdAt || userSession.updatedAt) {
    throw new Error("Cannot create a session with an ID, createdAt, or updatedAt as these are managed by the database");
  }

  const [requestBody, _] = serializeSession(userSession);
  const result: DBSession = await databases.createDocument(DATABASE_ID, SESSIONS_COLLECTION_ID, ID.unique(), requestBody);

  return deserializeSession(result as DBSession);
}

// getUserTranslations returns all sessions for a given user. If a groupId is provided, it will filter to sessions for that group.
export const getUserSessions = async (userId: string, groupId?: string): Promise<UserSession[]> => {
  const query = [Query.equal("owner_id", userId)];
  if (groupId) {
    query.push(Query.equal("group_id", groupId));
  }

  const response: Models.DocumentList<DBSession> = await databases.listDocuments(
    DATABASE_ID,
    SESSIONS_COLLECTION_ID,
    query,
  );

  return response.documents.map((dbs: DBSession) => deserializeSession(dbs));
}

export const getUserSession = async (sessionId: string): Promise<UserSession> => {
  const result = await databases.getDocument(DATABASE_ID, SESSIONS_COLLECTION_ID, sessionId);
  if (result) {
    return deserializeSession(result as DBSession);
  } else {
    throw new Error(`Session ${sessionId} was not found`)
  }
}

export const deleteUserSession = async (sessionId: string): Promise<void> => {
  await databases.deleteDocument(DATABASE_ID, SESSIONS_COLLECTION_ID, sessionId);
}
