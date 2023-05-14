import { useState, useEffect } from 'react';
import { account } from '../utils/appwrite';

const useUser = () => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await account.createEmailSession(email, password);
      setUser(response);
      console.log('success')
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await account.create(email, password);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };

  return { user, login, logout, signup };
};

export default useUser;
