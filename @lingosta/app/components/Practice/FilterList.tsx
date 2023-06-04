import React, { useEffect, useState } from 'react'
import Highlighter from "react-highlight-words";
import Button from '../Button';

const FilterList = ({ translationsList }) => {

    const [checkedTranslations, setCheckedTranslations] = useState([]);

    useEffect(() => {
        if(translationsList) {
            setCheckedTranslations(translationsList.map(() => true));
        }
    }, [translationsList]);

    const handleBundleTranslations = () => {
        const selectedTranslations = translationsList?.filter((_, index) => checkedTranslations[index]);
        
    };

    console.log(checkedTranslations)

    return (
        <div className='my-4'>
            <div className=''>
                <Button label='Begin practice' onClick={handleBundleTranslations}/>
            </div>
            <div className='mt-4 text-lg font-semibold'>
                Select translations to practice:
            </div>
            <div className='mx-auto grid grid-cols-1 gap-4 mt-2'>
                {translationsList.map((data, index) => (
                    <div className='flex space-x-2 items-center'>
                        <div className='flex w-full justify-between shadow-md h-24 p-6 rounded-3xl bg-slate-300 hover:bg-slate-400 transition'>
                                <div className='flex items-center'>
                                    <p className='text-lg'>
                                    <Highlighter
                                        highlightClassName="bg-teal-400"
                                        searchWords={data.terms.map(term => term.source)}
                                        autoEscape={true}
                                        textToHighlight={data.rawData}
                                    />
                                    </p>
                                </div>
                                <span className='text-xs md:text-sm'>
                                    {new Date(data.updatedAt).toLocaleDateString()}
                                </span>
                        </div>
                        <input
                            type='checkbox'
                            checked={checkedTranslations[index]}
                            onChange={(e) => {
                                const newCheckedTranslations = [...checkedTranslations];
                                newCheckedTranslations[index] = e.target.checked;
                                setCheckedTranslations(newCheckedTranslations);
                            }}
                            className='w-12 h-6'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterList