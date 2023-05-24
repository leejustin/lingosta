import React, { useState } from 'react'

import { ID } from 'appwrite';
import { databases } from '../../helpers/AppwriteHelper';
import { useUser } from '../../providers/UserProvider';


import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';
import { toast } from 'react-hot-toast';


const TranslateContainer = () => {

    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('kr')
    const [terms, setTerms] = useState([]);

    const handleSave = async(event) => {

        try {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS,
                process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_TRANSLATIONS,
                ID.unique(),
                {
                    owner_id: user.$id,
                    group_id: process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_GROUPS_ID,
                    raw_data: input,
                    source_language: language,
                }
            );
            setInput('');
            setTerms([]);
            console.log('success');

        } catch(error) {
            console.log(error);
        }
    }

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
                <Textbox input={input} handleInput={handleInput} language={language} setLanguage={setLanguage}/>
                <Button label='Lingosta' onClick={() => setIsOpen(true)}/>
            </div>
            {!isOpen ? <></> : 
                (
                    <TranslateModal handleSave={handleSave} isOpen={isOpen} setIsOpen={setIsOpen} input={input} />
                )
            }
    </div>
    )
}

export default TranslateContainer