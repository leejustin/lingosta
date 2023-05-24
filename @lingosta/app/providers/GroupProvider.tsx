"use client";

import React, { useState, useEffect, useContext, createContext } from 'react';
import { databases } from '../helpers/AppwriteHelper';
import {UserGroup} from "@lingosta/common";


export type GroupContextType = {
  createGroup: (group: UserGroup) => Promise<UserGroup>;
  listUserGroups: (userId: string) => Promise<UserGroup[]>;
  getGroup: (groupId: string) => Promise<UserGroup>;
  updateGroupName: (groupId: string, groupName: string) => Promise<UserGroup>;
  deleteGroup: (groupId: string) => Promise<void>;
};

export const GroupContext = createContext<GroupContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const GroupProvider = ({children}: Props) => {
  const [userGroups, setUserGroups] = useState<Map<string, UserGroup> | undefined>(undefined);

  const createGroup = async (group: UserGroup): Promise<UserGroup> => {
    return group; // placeholder
  }

  const listUserGroups = async (userId: string): Promise<UserGroup[]> => {
    if (userGroups === undefined) {
      // fetch and set
      //databases.listDocuments()

      const response = undefined;

      setUserGroups(response);
      return response;
    } else {
      return Array.from(userGroups.values());
    }
  }

  const getGroup = async (groupId: string): Promise<UserGroup> => {
    if (userGroups === undefined) {
      // need to query the data
    }
    else if (userGroups.has(groupId)) {
      return userGroups.get(groupId) as UserGroup;
    } else {
      // query
    }
  }


  const updateGroupName = async (groupId: string, groupName: string): Promise<UserGroup> => {
    return; // placeholder
  }

  const deleteGroup = async (groupId: string): Promise<void> => {
    return;
  }

  return (
    <GroupContext.Provider value={{createGroup, listUserGroups, getGroup, updateGroupName, deleteGroup}}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;



