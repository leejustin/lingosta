import React from 'react';
import Link from 'next/link';
import { BsTranslate, BsPencilFill } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className='block md:hidden bg-white/50 backdrop-blur-sm border-t-[1px] border-neutral-200 z-50 py-2 mx-auto fixed bottom-0 left-0 right-0'>
            <div className='flex items-center justify-center space-x-24'>
                <Link href='translate' className='flex flex-col items-center space-y-1'>
                    <BsTranslate size={30} className='text-gray-600' />
                    <p className="m-auto text-xs font-semibold text-gray-600">Translate</p>
                </Link>
                <Link href='practice' className='flex flex-col items-center space-y-1'>
                    <BsPencilFill size={30} className='text-gray-600'/>
                    <p className='m-auto text-xs font-semibold text-gray-600'>Practice</p>
                </Link>
            </div>
        </footer>
    )
}

export default Footer