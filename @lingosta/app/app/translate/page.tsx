"use client";

import React, { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/navigation';
import Textbox from '../../components/Translate/Textbox';

const Translate = () => {

    const { user } = useUser();
    const router = useRouter();
  
    if(!user) {
        return (
            <div>
                loading
            </div>
        )
    }

    return (
        <div className='mx-auto'>
            <div className='mt-8 p-5 text-center justify-center items-center space-y-4'>
                <Textbox />
                <button className='p-4 py-2 font-semibold rounded-lg bg-blue-500 text-white border  hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'>
                    Lingosta
                </button>
            </div>
        </div>
    )
}

export default Translate