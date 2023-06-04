interface ButtonProps {
    label?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick
}) => {
    return (
        <button onClick={onClick} className='p-4 py-2 w-full font-semibold rounded-3xl bg-teal-500 text-white border transition hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'>
            {label}
        </button>
    )
}

export default Button