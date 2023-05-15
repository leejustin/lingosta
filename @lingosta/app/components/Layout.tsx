'use client'

import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

    const { checkUser } = useUser();

    useEffect(() => {
        checkUser()
    },[checkUser])

    return (
    <div className='container h-full mx-auto'>
        {children}
    </div>
    )
}

export default Layout