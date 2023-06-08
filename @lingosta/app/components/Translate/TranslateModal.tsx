import React, { Fragment, useState, useEffect } from 'react'
import {Dialog, Transition} from '@headlessui/react';
import Button from '../Button';

const TranslateModal = ({ isLoading, handleSave, input, isOpen, setIsOpen, translations }) => {

  const closeModal = () => {
    setIsOpen(false)
  }

  const [checkedTerms, setCheckedTerms] = useState([]);

  useEffect(() => {
    if (translations && translations.terms) {
      setCheckedTerms(translations.terms.map(() => true));
    }
  }, [translations]);

  const handleModalSave = () => {
    const selectedTerms = translations.terms?.filter((_, index) => checkedTerms[index]);
    handleSave(selectedTerms);
  };

  return (
    <div>
    {isLoading ? (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='animate-pulse w-2/3 max-w-xl mx-auto'>
            <div className=' h-72 bg-white rounded-md text-center'>
            </div>
          </div>
        </div>
      ) : (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div className=' border-b-[2px] border-neutral-300 w-full py-2 text-lg'>
                    <p>
                    {input}
                    </p>
                    <p className=''>
                      {translations?.terms?.map((term) => (
                        <> {term.target}</> 
                      ))}
                    </p>
                  </div>
                  <div className='border-b-[2px] border-neutral-300 w-full py-2 '>
                    <div className='relative overflow-x-auto'>
                      <table className='w-full text-left text-lg'>
                        <tbody>
                          {translations?.terms?.map((term, index) => (
                              <tr className='' key={index}>
                                <td className=''>
                                  {term.source}
                                </td>
                                <td className=''>
                                  {term.target}
                                </td>
                                <td className="w-4 p-2">
                                  <div className="flex items-center">
                                      <input 
                                        type='checkbox'
                                        checked={checkedTerms[index]}
                                        onChange={(e) => {
                                          const newCheckedTerms = [...checkedTerms];
                                          newCheckedTerms[index] = e.target.checked;
                                          setCheckedTerms(newCheckedTerms);
                                        }}
                                        className="w-5 h-5 text-black border-gray-300 rounded" 
                                      />
                                  </div>
                                </td>
                              </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='flex flex-row justify-end mt-4 space-x-2'>
                    <button 
                      className='inline-flex justify-center rounded-md border border-transparent transition bg-gray-300 px-6 py-2 text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2' 
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                    <button 
                      className='inline-flex justify-center rounded-md border border-transparent transition bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => handleModalSave()}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>      
    )}
    </div>
  )
}

export default TranslateModal