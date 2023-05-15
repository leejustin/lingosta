'use client'

import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push('/auth/login')
        }
    },[user, router])

    return (
    <div className='container h-full mx-auto'>
        {children}
    </div>
    )
}

export default Layout