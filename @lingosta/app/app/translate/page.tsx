"use client";

<<<<<<< HEAD
import { useUser } from '../../providers/useUser'

import TranslateContainer from '../../components/Translate/TranslateContainer';
=======
import React, { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/navigation';
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79

const Translate = () => {

    const { user } = useUser();
<<<<<<< HEAD
  
    if(!user) {
        return (
            <div className='mt-8 p-5 text-center'>
                loading
            </div>
        )
    }

    return (
        <TranslateContainer />
=======
    const router = useRouter();
  
    useEffect(() => {
      if(!user) {
        router.push('/')
      } else {
        console.log('something went wrong')
    }
    }, []);

    return (
        <div>Welcome back, {user?.name}!</div>
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
    )
}

export default Translate