import React from 'react'
import LangListbox from './LangListbox';

const Textbox = ({input, handleInput, language, setLanguage}) => {
    return (
        <div className=''>
            <div className='flex space-x-2'>
            <input
                value={input}
                type='text'
                className="
                    block
                    drop-shadow-xl
                    p-2.5
                    w-full
                    text-md
                    text-gray-50
                    bg-gray-800
                    rounded-lg
                    border
                    border-gray-300
                "
                onChange={handleInput}
                placeholder="Translate your sentence here..."
            >
            </input>
                <LangListbox language={language} setLanguage={setLanguage} />
            </div>
        </div>
    )
}

export default Textbox