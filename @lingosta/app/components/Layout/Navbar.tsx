"use client";
import { useUser } from '../../hooks/useUser'
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
                    {!user ? (
                        <div className='space-x-4'>
                            <Link href='login'>Login</Link>
                            <Link href='signup'>Join</Link>
                        </div>
                    ) : (
                        <div className='flex gap-4 capitalize'>
                            <p>Hey, {user.name}!</p>
                            <Link href='translate'>Translate</Link>
                            <button onClick={() =>logout()}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar