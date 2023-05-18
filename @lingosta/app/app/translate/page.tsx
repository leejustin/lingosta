"use client";

import React, { useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/navigation';

const Translate = () => {

    const { user } = useUser();
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
    )
}

export default Translate