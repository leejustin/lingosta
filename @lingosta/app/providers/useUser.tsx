"use client";
import { useState, useEffect, useContext, createContext } from 'react';
import { account } from '../utils/appwrite';
import { AppwriteException } from 'appwrite';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

export interface UserState {
  user: {name: string; email: string} | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultState: UserState = {
  user: null,
  login: async() => {},
  signup: async() => {},
  logout: async() => {},
}

const UserContext = createContext<UserState>(defaultState);

export const UserProvider = ({ children } : {children: any}) => {

  const router = useRouter();
  const [user, setUser] = useState<null | {email:string, name:string}>(null);
  
  const checkUser = async() => {
    try {
      const response = await account.get();
      setUser(response)
      console.log('user exists')
    } catch(error) {
      console.log(error)
      router.push('/')
    }
  };

  const login = async (email:string, password:string) => {
    try {
      await account.createEmailSession(email, password);
      await checkUser();
      router.push('/translate')
    } catch (error: any) {
      const appwriteException = error as AppwriteException;
      toast.error(appwriteException.message)
      console.error(error);
    }
  };

  const signup = async (email:string, password:string, name:string) => {
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
      router.push('/login')
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, signup}}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);
