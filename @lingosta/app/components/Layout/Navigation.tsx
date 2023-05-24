"use client"

import React, { useState } from 'react';

const Navigation = () => {
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
  const isSidebar = window.innerWidth < 768;

  return (
    <div>
      {isSidebar ? (
        <SidebarNavigation items={items} activeItem={activeItem} />
      ) : (
        <BottomNavigation items={items} activeItem={activeItem} />
      )}
    </div>
  );
};

const SidebarNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:bg-gray-500 dark:text-gray-300"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4h14v10H3z" />
          </svg>
          Dashboard
        </button>
        <button
          className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:bg-gray-500 dark:text-gray-300"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5z" />
          </svg>
          Projects
        </button>
        <button
          className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:bg-gray-500 dark:text-gray-300"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z" />
            <path d="M12 6a1 1 0 0 0-1-1 1 1 0 0 0-1 1 1 1 0 0 0 1 1z" />
          </svg>
          Settings
        </button>
        <button
          className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:bg-gray-500 dark:text-gray-300"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20zM8.5 14a1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>
          Profile
        </button>
      </div>
    </nav>
  );
};

const BottomNavigation = ({ items, activeItem }) => {
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

export default Navigation;