import Link from 'next/link'
import React, { useState } from 'react'
import Highlighter from "react-highlight-words";

const PrevTranslationsList = ({ translationsList, setIsViewOnlyOpen, setSelectedTranslation }) => {

    const handleClick = (rawData, terms) => {
        setSelectedTranslation({rawData, terms})
        setIsViewOnlyOpen(true);
    }

    return (
        <div className=''>
            <div className='mt-4 text-lg font-semibold'>
                Previous translations:
            </div>
            <div className='mx-auto grid grid-cols-1 gap-4 mt-2'>
                {translationsList.map((data, index) => (
                    <div onClick={()=> handleClick(data.rawData, data.terms)} key={index} className='flex justify-between shadow-md h-24 p-6 rounded-3xl bg-slate-300 hover:bg-slate-400 transition'>
                            <div className='flex items-center max-w-md'>
                                <p className='text-lg'>
                                <Highlighter
                                    highlightClassName="bg-teal-500"
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
                ))}
            </div>
        </div>
    )
}

export default PrevTranslationsList