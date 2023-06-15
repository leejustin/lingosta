import React from 'react';
import { getLanguageName } from '../../models';
import { useGroup } from '../../providers/GroupProvider';

const Textbox = ({ input, handleInput }) => {

    const { activeGroup } = useGroup();
    //Capitalize the first letter of the Language
    const activeLanguage = getLanguageName(activeGroup?.language)?.charAt(0).toUpperCase() + getLanguageName(activeGroup?.language)?.slice(1);


    return (
        <div className="">
        <div className="flex space-x-2">
            <input
            required
            value={input}
            type="text"
            className="
                block
                drop-shadow-xl
                p-2.5
                w-full
                text-md
                text-gray-50
                bg-gray-800
                rounded-3xl
                border border-gray-300
            "
            onChange={handleInput}
            placeholder={`Translate your ${activeLanguage} sentence here...`}
            />
        </div>
        </div>
    );
};

export default Textbox;
