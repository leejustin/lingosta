import React, { useState } from 'react'

import { useUser } from '../../providers/UserProvider';
import { UserTranslation } from '../../../common/';


import Textbox from './Textbox';
import { BsTranslate } from 'react-icons/bs';
import Button from '../Button';
import TranslateModal from './TranslateModal';
import { useGroup } from '../../providers/GroupProvider';

import axios from 'axios';
import { createTranslation } from '../../helpers/TranslationHelper';

const TranslateContainer = () => {

    // const testdata = {
    //     "type": "es",
    //     "sentence": "tengo muchos amigos",
    //     "terms": [
    //       {
    //         "source": "tengo",
    //         "target": "I have",
    //         "weight": 0.8
    //       },
    //       {
    //         "source": "muchos",
    //         "target": "many",
    //         "weight": 0.7
    //       },
    //       {
    //         "source": "amigos",
    //         "target": "friends",
    //         "weight": 0.9
    //       },
    //       {
    //         "source": "amigos",
    //         "target": "friends",
    //         "weight": 0.9
    //       },
    //       {
    //         "source": "amigos",
    //         "target": "friends",
    //         "weight": 0.9
    //       }
    //     ]
    //   }

    const { user } = useUser();
    const { activeGroup } = useGroup();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState('');
    const [translations, setTranslations] = useState(null);
    
    const handleSave = async(selectedTerms) => {

        const userTranslation: UserTranslation = {
            ownerId: user.$id,
            groupId: activeGroup.id,
            terms: selectedTerms,
            rawData: input,
            sourceLanguage: activeGroup.language
        }
        
        try {
            createTranslation(userTranslation);

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
                        isOpen={isOpen}
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