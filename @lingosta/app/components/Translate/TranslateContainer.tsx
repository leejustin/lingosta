import React, { useState } from 'react'

import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';


const TranslateContainer = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [type, setType] = useState('')

    const handleInput= (event:any) => {
        setInput(event.target.value);
    }

    return (
        <div className='mx-auto p-5'>
            <div className='mt-8 text-center justify-center items-center space-y-4'>
            <div className='flex gap-2 font-semibold'>
                <label className=''>
                    <BsTranslate size={20}/>
                </label>
                Translate
            </div>
                <Textbox input={input} setInput={setInput} handleInput={handleInput} />
                <Button label='Lingosta' onClick={() => setIsOpen(true)}/>
            </div>
            {!isOpen ? <></> : 
                (
                    <TranslateModal isOpen={isOpen} setIsOpen={setIsOpen} input={input} />
                )
            }
    </div>
    )
}

export default TranslateContainer