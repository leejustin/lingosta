"use client";
<<<<<<< HEAD
import { useUser } from '../../providers/useUser';
import Link from 'next/link';
import { BsTranslate } from 'react-icons/bs';

=======
import { useUser } from '../../hooks/useUser'
import Link from 'next/link';
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79

const Navbar = () => {

    const { user, logout } = useUser();

    return (
        <div className='border-b-[1px] border-neutral-200 p-5'>
            <div className='flex justify-between'>
<<<<<<< HEAD
                <Link href='/' className='text-lg font-semibold flex gap-2'>
                    <BsTranslate size={20}/> Lingosta
=======
                <Link href='/' className='text-lg font-semibold'>
                    Lingosta
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
                </Link>

                <div>
                    {!user ? (
                        <div className='space-x-4'>
                            <Link href='login'>Login</Link>
                            <Link href='signup'>Join</Link>
                        </div>
                    ) : (
                        <div className='flex gap-4 capitalize'>
<<<<<<< HEAD
                            <Link href='translate'>Translate</Link>
=======
                            <p>Hey, {user.name}!</p>
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
                            <button onClick={() =>logout()}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar