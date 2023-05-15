import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../utils/appwrite';
import { useRouter } from 'next/navigation';

const useUser = () => {

  const router = useRouter();
  const [user, setUser] = useState(null);

  const checkUser = async() => {
    try {
      const response = await account.get();
      setUser(response)
      console.log('hello')
    } catch(error) {
      console.log(error)
    }
  };

  const login = async (email:string, password:string) => {
    try {
      await account.createEmailSession(email, password);
      await checkUser();
      console.log('success');
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

  const signup = async (email:string, password:string, name:string) => {
    try {
      const response = await account.create(email, password, name);
      setUser(response);
      await account.createEmailSession(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return { user, login, logout, signup };
};

export default useUser;
