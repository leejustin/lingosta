"use client";
import React, { createContext, useState } from 'react';

export const TranslationsContext = createContext([]);

export const TranslationsProvider = ({ children }) => {
  const [selectedTranslations, setSelectedTranslations] = useState([]);

  return (
    <TranslationsContext.Provider value={[selectedTranslations, setSelectedTranslations]}>
      {children}
    </TranslationsContext.Provider>
  );
};