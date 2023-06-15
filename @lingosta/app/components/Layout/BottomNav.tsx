"use client";

import React from 'react';
import Link from 'next/link';
import { BsTranslate } from 'react-icons/bs';
import { VscNote } from 'react-icons/vsc';
import { TbDragDrop } from 'react-icons/tb';
import { useUser } from '../../providers/UserProvider';

const BottomNav = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
      <div className='block md:hidden bg-white/50 backdrop-blur-sm border-t-[1px] border-neutral-200 z-50 py-2 mx-auto fixed bottom-0 left-0 right-0'>
          <div className='flex items-center justify-center space-x-24'>
              <Link href='translate' className='flex flex-col items-center space-y-1'>
                  <BsTranslate size={30} className='text-gray-600' />
                  <p className='m-auto text-xs font-semibold text-gray-600'>Translate</p>
              </Link>
              <Link href='practice' className='flex flex-col items-center space-y-1'>
                  <VscNote size={30} className='text-gray-600' />
                  <p className='m-auto text-xs font-semibold text-gray-600'>Cards</p>
              </Link>
              <Link href='practice/jumble/12345' className='flex flex-col items-center space-y-1'>
                  <TbDragDrop size={30} className='text-gray-600' />
                  <p className='m-auto text-xs font-semibold text-gray-600'>Jumble</p>
              </Link>
          </div>
      </div>
    );
};

export default BottomNav;
