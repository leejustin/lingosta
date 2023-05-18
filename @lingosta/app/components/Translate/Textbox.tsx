import React from 'react'

const Textbox = () => {
    return (
        <div>
        <textarea 
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
            placeholder="Translate your sentence here..."
        >
        </textarea>
        </div>
    )
}

export default Textbox