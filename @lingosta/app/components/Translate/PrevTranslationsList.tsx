import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import Highlighter from 'react-highlight-words';

const PrevTranslationsList = ({
                                translationsList,
                                setIsViewOnlyOpen,
                                setSelectedTranslation,
                                handleDelete,
                              }) => {
  const handleClick = (rawData, terms) => {
    setSelectedTranslation({ rawData, terms });
    setIsViewOnlyOpen(true);
  };

    if(translationsList.length === 0) {
        return <></>
    }

    return (
        <div className=''>
            <Toaster />
            <div className='mt-4 text-lg font-semibold'>
                Previous translations:
            </div>
            <div className='mx-auto grid grid-cols-1 gap-4 mt-2'>
                {translationsList.map((data, index) => (
                    <div key={index} className='flex justify-between shadow-md h-28 p-6 rounded-3xl bg-slate-300 hover:bg-slate-400 transition'>
                            <div onClick={()=> handleClick(data.rawData, data.terms)} className='flex items-center w-full h-full'>
                                <p className='text-lg flex-wrap'>
                                <Highlighter
                                    highlightClassName="bg-teal-500"
                                    searchWords={data.terms.map(term => term.source)}
                                    autoEscape={true}
                                    textToHighlight={data.rawData}
                                />
                                </p>
                            </div>
                            <div className='flex flex-col justify-between h-full'>
                                <span className='text-xs md:text-sm'>
                                    {new Date(data.updatedAt).toLocaleDateString()}
                                </span>
                                <button 
                                    onClick={() => handleDelete(data.id)}
                                    className='flex items-center bg-slate-400 hover:bg-slate-700 transition p-2 rounded-xl text-sm'
                                >
                                    <AiFillDelete /> Delete
                                </button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
