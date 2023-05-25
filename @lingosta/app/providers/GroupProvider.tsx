"use client";

import React, {useState, useEffect, createContext, useContext} from 'react';
import { databases, account } from '../helpers/AppwriteHelper';
import {DBGroup, deserializeGroup, serializeGroup, UserGroup} from "../../common/";
import {ID, Models, Query} from "appwrite";
import {useUser} from "../providers/UserProvider";

const DATABASE_ID = process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS;
const GROUPS_COLLECTION_ID = process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_GROUPS;

export type GroupContextType = {
  userGroups: UserGroup[] | undefined;
  createGroup: (group: UserGroup) => Promise<UserGroup>;
  listUserGroups: (userId: string) => Promise<UserGroup[]>;
  getGroup: (groupId: string) => Promise<UserGroup>;
  updateGroup: (groupData: UserGroup) => Promise<UserGroup>;
  deleteGroup: (groupId: string) => Promise<void>;
};

export const GroupContext = createContext<GroupContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GroupProvider = ({children}: Props) => {
  // The length of this iterable is expected to be relatively small, so an Array is sufficient over Map<T> to keep things simple
  const [userGroups, setUserGroups] = useState<UserGroup[] | undefined>(undefined);
  const [activeGroup, setActiveGroup] = useState<string>("");

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      initializeUserGroups(user.$id).then(
        (groups) => {
          setUserGroups(groups);
          setActiveGroup(user.prefs?.activeGroupId ?? groups[0].id);
        }
      )
    } else {
      setUserGroups(undefined);
      setActiveGroup("");
    }
  }, [user]);

  const initializeUserGroups = async (userId: string): Promise<UserGroup[]> => {
    try {
      const response: Models.DocumentList<DBGroup> = await databases.listDocuments(
        DATABASE_ID,
        GROUPS_COLLECTION_ID,
        [
          Query.equal("owner_id", userId)
        ]
      );
      const results: UserGroup[] = response.documents.map((dbg: DBGroup) => deserializeGroup(dbg));
      setUserGroups(results);

      return results;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  const createGroup = async (group: UserGroup): Promise<UserGroup> => {
    const [groupDocument, _] = serializeGroup(group);
    const result: DBGroup = await databases.createDocument(DATABASE_ID, GROUPS_COLLECTION_ID, ID.unique(), groupDocument);
    const newGroup = deserializeGroup(result as DBGroup);

    setUserGroups([...userGroups, newGroup])
    return newGroup;
  }

  const listUserGroups = async (userId: string, refresh: boolean = true): Promise<UserGroup[]> => {
    if (userGroups === undefined || refresh) {
      return initializeUserGroups(userId);
    } else {
      return userGroups;
    }
  }

  const getGroup = async (groupId: string): Promise<UserGroup> => {
    const result = await databases.getDocument(DATABASE_ID, GROUPS_COLLECTION_ID, groupId);
    if (result) {
      return deserializeGroup(result as DBGroup);
    } else {
      throw new Error(`Group ${groupId} was not found`)
    }
  }

  const updateGroup = async (groupData: UserGroup): Promise<UserGroup> => {
    const [dbGroup, groupId] = serializeGroup(groupData);

    const result = await databases.updateDocument(DATABASE_ID, GROUPS_COLLECTION_ID, groupId, dbGroup);

    setUserGroups(userGroups.filter((group) => group.id !== groupId).concat(groupData));
    return deserializeGroup(result as DBGroup);
  }

  // deleteGroup performs a hard delete on a group. This does NOT delete documents that belong to this group as we want to preserve that data.
  const deleteGroup = async (groupId: string): Promise<void> => {
    await databases.deleteDocument(DATABASE_ID, GROUPS_COLLECTION_ID, groupId);
  }

  return (
    <GroupContext.Provider value={{userGroups, createGroup, listUserGroups, getGroup, updateGroup, deleteGroup}}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;

export const useGroup = () => useContext(GroupContext);
