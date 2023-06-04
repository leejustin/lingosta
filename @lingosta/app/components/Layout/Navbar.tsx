"use client";
import { useUser } from '../../providers/UserProvider';
import Link from 'next/link';
import { BsTranslate } from 'react-icons/bs';
import GroupSelection from "../Group/GroupSelection";
import SettingsSelection from "../Settings/SettingsSelection";

import Image from 'next/image';
import lingostaIcon from "../../public/images/logo.svg";


const Navbar = () => {

    const { user } = useUser();

    return (
        <div className='border-b-[1px] border-neutral-200 p-5'>
            <div className='flex justify-between'>
                <Link href='/' className='text-lg font-semibold flex gap-2'>
                    <Image
                      priority
                      width={40}
                      height={40}
                      src={lingostaIcon}
                      alt="Lingosta!"
                    />
                    <span className="mt-1">Lingosta</span>
                </Link>

                <div>
                    {!user ? (
                        <div className='space-x-4'>
                            <Link className='m-auto font-semibold hover:text-gray-500' href='login'>Login</Link>
                            <Link className='m-auto font-semibold hover:text-gray-500' href='signup'>Join</Link>
                        </div>
                    ) : (
                        <div className='flex gap-4 capitalize '>
                            <Link className="m-auto font-semibold hover:text-gray-500" href='translate'>Translate</Link>
                            <Link className="m-auto font-semibold hover:text-gray-500" href='practice'>Practice</Link>
                            <GroupSelection />
                            <SettingsSelection />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar