import React, { useState } from 'react'

import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import Checkbox from './Checkbox';


const TranslateContainer = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='mx-auto p-5'>
            <div className='mt-8 text-center justify-center items-center space-y-4'>
            <div className='flex gap-2 font-semibold'>
                <label className=''>
                    <BsTranslate size={20}/>
                </label>
                Translate
            </div>
                <Textbox />
                <Button label='Lingosta' onClick={() => setIsOpen(true)} />
            </div>
            {!isOpen ? <></> : 
                (
                    <Checkbox isOpen={isOpen} setIsOpen={setIsOpen}/>
                )
            }
    </div>
    )
}

export default TranslateContainer