import React, { useState, useEffect } from 'react'

import { useUser } from '../../providers/UserProvider';
import { UserTranslation } from '../../../common/';


import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';
import { useGroup } from '../../providers/GroupProvider';

import axios from 'axios';
import { createTranslation, getUserTranslations } from '../../helpers/TranslationHelper';
import { Toaster, toast } from 'react-hot-toast';
import PrevTranslationsList from './PrevTranslationsList';
import ViewOnly from './ViewOnly';

const TranslateContainer = () => {

    const { user } = useUser();
    const { activeGroup } = useGroup();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isViewOnlyOpen, setIsViewOnlyOpen] = useState<boolean>(false);
    const [input, setInput] = useState('');
    const [translations, setTranslations] = useState(null);
    const [translationsList, setTranslationsList] = useState([])
    const [selectedTranslation, setSelectedTranslation] = useState();
    
    const handleSave = async(selectedTerms) => {

        const userTranslation: UserTranslation = {
            ownerId: user.$id,
            groupId: activeGroup.id,
            terms: selectedTerms,
            rawData: input,
            sourceLanguage: activeGroup.language
        }
        
        try {
            await createTranslation(userTranslation);

            setInput('');
            setIsOpen(false);
            toast.success('Successfully saved!');

            userTranslationsList();
            
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
                toast.error('Please enter a sentence');
                return;
            }

            setIsLoading(true);
            setIsOpen(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/translations`, {
                type: activeGroup.language,
                sentence: input,
            })
            const translationsData = response.data;
            setTranslations(translationsData);
            
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const userTranslationsList = async() => {
        if(!user && !activeGroup) {
            return
        }
        
        try {
            const response = await getUserTranslations(user.$id, activeGroup.id)
            setTranslationsList(response);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userTranslationsList();
    }, [user, activeGroup])
    

    return (
        <div className='mx-auto p-5'>
            <Toaster />
            <div className='mt-8 text-center justify-center items-center space-y-4'>
            <div className='flex gap-2 items-center font-bold text-xl'>
                <label className=''>
                    <BsTranslate size={20} />
                </label>
                Translate
            </div>
                <Textbox input={input} handleInput={handleInput} />
                <Button label='Lingosta' onClick={() => handleTranslate()}/>
            </div>
            {translationsList && (
                    <PrevTranslationsList 
                        translationsList={translationsList} 
                        setSelectedTranslation={setSelectedTranslation} 
                        setIsViewOnlyOpen={setIsViewOnlyOpen} 
                    />
                )
            }
            {!isOpen ? <></> : 
                (
                    <TranslateModal
                        isLoading={isLoading}
                        handleSave={handleSave} 
                        isOpen={isOpen}
                        setIsOpen={setIsOpen} 
                        input={input} 
                        translations={translations}
                    />
                )
            }
            {!isViewOnlyOpen ? <></> : 
                (
                    <ViewOnly
                        isLoading={isLoading}
                        isViewOnlyOpen={isViewOnlyOpen}
                        setIsViewOnlyOpen={setIsViewOnlyOpen} 
                        translations={selectedTranslation}
                    />
                )
            }
    </div>
    )
}

export default TranslateContainer