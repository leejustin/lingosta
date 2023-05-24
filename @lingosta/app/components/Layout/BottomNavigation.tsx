"use client";

import React, { useState } from 'react';

const BottomNavigation = () => {
  const [activeItem, setActiveItem] = useState("home");

  const items = [
    {
      label: "Home",
      icon: "home",
    },
    {
      label: "Wallet",
      icon: "user",
    },
    {
      label: "Settings",
      icon: "cog",
    },
    {
      label: "Profile",
      icon: "user-circle",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${activeItem === item.label ? 'active' : ''}`}
          >
            <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
