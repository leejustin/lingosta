import React, {FC} from "react";

interface WordProps {
  text: string;
  hint: string;
}

const Word: FC<WordProps> = ({text, hint}) => (
  <div
    className="word underline font-medium text-xl hover:text-gray-600 tracking-wide underline-offset-8 decoration-dotted group cursor-pointer select-none decoration-gray-600">
    <p>
      {text}{" "}
      <span
        className="tooltip-text text-lg bg-whit border-[#2A9D8F] border-solid border-2 p-3 -mt-20 transition-all -ml-6 rounded hidden group-hover:block absolute text-center py-2 px-6 z-50">
        {hint}
      </span>
    </p>
  </div>
);

export default Word;
