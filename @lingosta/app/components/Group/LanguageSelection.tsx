'use client';

import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from 'react-icons/hi2'
import {getLanguageEmoji, getLanguageName, Language} from "../../../common";

const SUPPORTED_LANGUAGES: Language[] = process.env.NEXT_PUBLIC_SUPPORTED_TARGET_LANGUAGES.split(",").map((language: string) => language as Language);

interface LanguageSelectionProps {
  setLanguage: (language: Language) => void;
}

const LanguageSelection = ({setLanguage}: LanguageSelectionProps) => {

  const languages = SUPPORTED_LANGUAGES.map((language: Language) => {
    return { id: language, name: getLanguageName(language), icon: getLanguageEmoji(language) }
  });

  const [activeLanguage, setActiveLanguage] = useState(undefined);

  return (
    <div className="w-full">
      <Listbox value={activeLanguage} onChange={(v) => {
        setActiveLanguage(v);
        setLanguage(v.id)}
      }>
        <div className="relative ">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
            {activeLanguage ? <span className="block">{activeLanguage.icon} {activeLanguage.name}</span> : <span>Select a Language</span>}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages?.sort((a, b) => a.name.localeCompare(b.name) ) .map((language) => (
                <Listbox.Option
                  key={language.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 ${
                      active ? 'bg-blue-200 text-gray-900' : 'text-gray-900'
                    }`
                  }
                  value={language}
                >
                  <span
                    className={`block truncate ${
                      activeLanguage ? 'font-lg' : 'font-normal'
                    }`}
                  >
                    {language.icon} {language.name}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSelection;