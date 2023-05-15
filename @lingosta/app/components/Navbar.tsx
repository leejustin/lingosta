'use client';

import React from 'react'
import useUser from '../hooks/useUser'

const Navbar = () => {

    const { logout } = useUser();

  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
        <div className='flex justify-between'>
            <div>
                Lingosta
            </div>
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar