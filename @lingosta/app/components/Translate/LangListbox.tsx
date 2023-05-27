'use client';

import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from 'react-icons/hi2'


const LangListbox = (language, setLanguage) => {
    const languages = [
        { id: 1, country: 'Korea', code: '🇰🇷' },
        { id: 2, country: 'Spain', code: '🇪🇸' },
    ]

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  return (
    <div className="w-24">
      <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
            <span className="block truncate">{selectedLanguage.code}</span>
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
              {languages?.map((language) => (
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
                      selectedLanguage ? 'font-lg' : 'font-normal'
                    }`}
                  >
                    {language.code}
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

export default LangListbox