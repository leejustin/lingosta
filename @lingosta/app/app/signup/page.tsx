'use client'
import React, { FormEvent, useState } from 'react';
import { useUser } from '../../hooks/useUser';

const SignUp = () => {

    const { signup } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e:FormEvent<EventTarget>) => {
        e.preventDefault();
        signup(name, email, password);
    };


    return (
        <div>
            <div className='my-10 text-xl w-full text-center max-w-2xl mx-auto'>
                Get started with Lingosta
            </div>
            <div className='mt-5 px-6 md:p-0 flex max-w-lg mx-auto'>
                <div className='flex-grow flex flex-col justify-center p-5 border-[1px] bg-slate-100 border-neutral-700 rounded-xl'>

                </div>
            </div>
        </div>
    )
}

export default SignUp