import React from 'react';

const Textbox = ({ input, handleInput }) => {
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
          placeholder="Translate your sentence here..."
        />
      </div>
    </div>
  );
};

export default Textbox;
