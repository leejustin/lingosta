'use client'
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../../../providers/useUser';
import Input from '../../../components/Input';

const SignUp = () => {

    const { signup } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e:FormEvent<EventTarget>) => {
        e.preventDefault();
        signup(email, password, name);
    };


    return (
        <div>
            <div className='my-10 text-xl w-full text-center max-w-2xl mx-auto'>
                Get started with Lingosta.
            </div>
            <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto '>
                <div className='flex-grow flex flex-col justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl'>
                    <form onSubmit={handleSignup} className='space-y-2'>
                        <Input 
                            id='name'
                            type='text'
                            value={name}
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                            label='Name *'
                        />
                        <Input 
                            id='email'
                            type='email'
                            value={email}
                            placeholder='Email address'
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                            label='Email *'
                        />
                        <Input 
                            id='password'
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            label='Password *'
                        />
                        <p className='text-xs text-gray-500'>
                        Make sure it&apos;s at least 8 characters.
                        </p>
                        <button 
                        type='submit'
                        className='mx-auto mt-4 py-2 w-full font-semibold rounded-lg bg-blue-500 text-white border  hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'  
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>

            <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto '>
                <div className='flex-grow flex flex-col text-center justify-center p-5 border-[1px] bg-slate-200 border-neutral-300 rounded-xl'>
                     <p className="">
                        Already have an account?{' '}
                        <Link href="/login" className="cursor-pointer text-blue-500 hover:underline">
                          Login.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp