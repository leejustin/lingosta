'use client';

import React, { FormEvent, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import Link from 'next/link';

import Input from '../../components/Input';
import { useRouter } from 'next/navigation';

const Login = () => {

  const { login, user } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    login(email, password);
  }

  useEffect(() => {
    if(user) {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <div className='my-10 text-xl w-full text-center max-w-2xl mx-auto'>
        Sign in to Lingosta.
      </div>
      <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto '>
        <div className='flex-grow flex flex-col justify-center p-5 border-[1px] bg-slate-100 border-neutral-300 rounded-xl'>
          <form onSubmit={handleLogin} className=''>
            <label className="block mt-6" htmlFor="email">
              Email
            </label>
            <Input 
              id='email'
              type='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <label className="block mt-6" htmlFor="password">
              Password
            </label>
            <Input 
              id='password'
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <button 
              type='submit'
              className='mx-auto mt-4 py-2 w-full font-semibold rounded-lg bg-blue-500 text-white border  hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'  
            >
              Login
            </button>
            <p className="mt-6">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="cursor-pointer underline">
                    Sign Up
                  </Link>
                </p>
          </form>
          </div>
      </div>
    </div>
  )
}

export default Login