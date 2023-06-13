import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className="w-full p-4 py-2 font-semibold text-white transition bg-teal-500 rounded-3xl border hover:bg-teal-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
