import React, { FC } from "react";

interface OptionProps {
    displayText: string;
    provided: {
        innerRef: React.RefObject<HTMLDivElement>;
        draggableProps: any;
        dragHandleProps: any;
    };
}

const Option: FC<OptionProps> = ({ displayText, provided }) => (
    <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white shadow-lg py-2 px-4 rounded-lg"
        style={{
            userSelect: "none",
            ...provided.draggableProps.style,
        }}
    >
        {displayText}
    </div>
);

export default Option;