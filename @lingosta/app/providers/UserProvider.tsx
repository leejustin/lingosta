"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../helpers/AppwriteHelper';
import { AppwriteException, Models } from 'appwrite';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

export interface UserState {
  user?: Models.User<any>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePassword: (password: string, oldPassword: string) => Promise<void>;
  setUserConfigs: (user: UserConfigs) => void;
}

export interface UserConfigs {
  activeGroupId?: string;
}

const defaultState: UserState = {
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updatePassword: async () => {},
  setUserConfigs: async () => {},
};

const UserContext = createContext<UserState>(defaultState);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<any> | undefined>(undefined);

  const checkUser = async () => {
    try {
      const response = await account.get();
      setUser(response);
      console.log('user exists');
    } catch (error) {
      console.log(error);
      router.push('/');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      await checkUser();
      router.push('/translate');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      toast.error(appwriteException.message);
      console.error(error);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await account.create('unique()', email, password, name);
      setUser(response);
      await account.createEmailSession(email, password);
      router.push('/translate');
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      toast.error(appwriteException.message);
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const updatePassword = async (password: string, oldPassword: string) => {
    try {
      await account.updatePassword(password, oldPassword);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const setUserConfigs = async (userConfigs: UserConfigs): Promise<void> => {
    await account.updatePrefs(userConfigs);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, signup, setUserConfigs, updatePassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
