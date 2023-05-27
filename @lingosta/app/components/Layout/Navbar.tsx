"use client";
import { useUser } from '../../providers/UserProvider';
import Link from 'next/link';
import { BsTranslate } from 'react-icons/bs';
import GroupSelection from "../Group/GroupSelection";


const Navbar = () => {

    const { user, logout } = useUser();

    return (
        <div className='border-b-[1px] border-neutral-200 p-5'>
            <div className='flex justify-between'>
                <Link href='/' className='text-lg font-semibold flex gap-2'>
                    <BsTranslate size={20}/> Lingosta
                </Link>

                <div>
                    {!user ? (
                        <div className='space-x-4'>
                            <Link href='login'>Login</Link>
                            <Link href='signup'>Join</Link>
                        </div>
                    ) : (
                        <div className='flex gap-4 capitalize '>
                            <Link className="m-auto" href='translate'>Translate</Link>
                            <GroupSelection />
                            <button onClick={() =>logout()}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar