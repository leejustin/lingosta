import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BsFillTrashFill } from 'react-icons/bs';
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
            <div className='mt-10 text-lg font-semibold'>
                Saved translations:
            </div>
            <div className='mx-auto grid grid-cols-1 gap-4 mt-2'>
                {translationsList?.map((data, index) => (
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
                                    {new Date(data?.updatedAt).toLocaleDateString()}
                                </span>
                                <button 
                                    onClick={() => handleDelete(data.id)}
                                    className='flex mx-auto items-center text-black hover:text-gray-700 transition'
                                >
                                    <BsFillTrashFill size={25}/>
                                </button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrevTranslationsList