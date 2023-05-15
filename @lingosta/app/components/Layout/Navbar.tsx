'use client'

import React from 'react'
import useUser from '../../hooks/useUser'
import Link from 'next/link';

const Navbar = () => {

    const { user, logout } = useUser();

    return (
        <div className='border-b-[1px] border-neutral-200 p-5'>
            <div className='flex justify-between'>
                <Link href='/' className='text-lg font-semibold'>
                    Lingosta
                </Link>
                <div>
                    { !user && (
                        <div>
                            <Link href='/login'>
                                Login
                            </Link>
                        </div>
                    )}
                    { user && (
                        <div className="flex gap-5">
                            hello {user.email}
                            <button onClick={() => logout()}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar