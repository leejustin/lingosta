import { useState, useEffect } from 'react';
import { account } from '../utils/appwrite';
import { useRouter } from 'next/navigation';

const useUser = () => {

  const router = useRouter();
  const [user, setUser] = useState(null);

  const checkUser = async() => {
    try {
      const response = await account.get();
      setUser(response);
    } catch(error) {
      setUser(null)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await account.createEmailSession(email, password);
      setUser(response);
      console.log('success')
      router.push('/')
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      router.push('/auth/login')
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await account.create(email, password, name);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  return { user, checkUser, login, logout, signup };
};

export default useUser;
