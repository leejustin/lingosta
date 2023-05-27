import React, { useState } from 'react'

import { ID } from 'appwrite';
import { databases } from '../../helpers/AppwriteHelper';
import { useUser } from '../../providers/UserProvider';
import { UserTranslation } from '../../../common/';


import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';
import { useGroup } from '../../providers/GroupProvider';

import axios from 'axios';

const TranslateContainer = () => {

    const { user } = useUser();
    const { activeGroup } = useGroup();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [translations, setTranslations] = useState(null);

    const handleSave = async() => {
        try {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_API_APPWRITE_DB_USER_TRANSLATIONS,
                process.env.NEXT_PUBLIC_API_APPWRITE_COLLECTION_TRANSLATIONS,
                ID.unique(),
                {
                    owner_id: user.$id,
                    group_id: activeGroup.id,
                    source_translations: translations?.terms?.map(term => term.source) ?? [],
                    target_translations: translations?.terms?.map(term => term.target) ?? [],
                    translation_weights: translations?.terms?.map(term => term.weight) ?? [],
                    raw_data: input,
                    source_language: activeGroup.language,
                }
            );
            setInput('');
            setIsOpen(false);
            console.log('success');

        } catch(error) {
            console.log(error);
        }
    }

    const handleInput = (event:any) => {
        setInput(event.target.value);
    }

    const handleTranslate = async() => {
        try {
            if(input.trim() === '') {
                alert(`Please enter a sentence.`);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);

            const response = await axios.post('http://localhost:3001/api/translations', {
                type: activeGroup.language,
                sentence: input,
            })
            const translationsData = response.data;
            setTranslations(translationsData);
            
            console.log(translations)
            
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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
                <Textbox input={input} handleInput={handleInput} />
                <Button label='Lingosta' onClick={() => handleTranslate()}/>
            </div>
            
            {!isOpen ? <></> : 
                (
                    <TranslateModal 
                        isLoading={isLoading}
                        handleSave={handleSave} 
                        setIsOpen={setIsOpen} 
                        input={input} 
                        translations={translations}
                    />
                )
            }
    </div>
    )
}

export default TranslateContainer