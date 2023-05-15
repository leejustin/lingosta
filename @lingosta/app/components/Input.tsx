interface InputProps {
    id?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    value,
    placeholder,
    onChange,
    required
}) => {
    return (
        <input 
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className="
                w-full 
                p-2 
                placeholder-gray-400 
                rounded-lg 
                text-gray-700 
                text-md 
                border-[1px] 
                border-gray-300 
                focus:ring-0
                focus:border-gray-400
            "
        />
    )
}

export default Input