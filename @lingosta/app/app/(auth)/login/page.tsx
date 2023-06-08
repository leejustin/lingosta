"use client";

import React, { FormEvent, useState } from 'react'
import { useUser } from '../../../providers/UserProvider'
import Link from 'next/link';

import Input from '../../../components/Input';
import { Toaster } from 'react-hot-toast';

const Login = () => {

  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    await login(email, password);
  }

  return (
    <div>
      <Toaster />
      <div className='my-10 text-xl w-full text-center max-w-2xl mx-auto'>
        Sign in to Lingosta.
      </div>
      <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto '>
        <div className='flex-grow flex flex-col justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl'>
          <form onSubmit={handleLogin} className='space-y-2'>
            <Input 
              id='email'
              type='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              label='Email'
            />
            <Input 
              id='password'
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              label='Password'
            />
            <button 
              type='submit'
              className='mx-auto mt-4 py-2 w-full font-semibold rounded-lg bg-teal-500 text-white border  hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'  
            >
              Login
            </button>
          </form>
        </div>
      </div>
      
      <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto '>
        <div className='flex-grow flex flex-col text-center justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl'>
          <p className="">
            New to Lingosta?{' '}
            <Link href="/signup" className="cursor-pointer text-teal-500 hover:underline">
              Create an account.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login