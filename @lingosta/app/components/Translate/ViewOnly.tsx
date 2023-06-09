import React, { Fragment, useState, useEffect } from 'react'
import {Dialog, Transition} from '@headlessui/react';

const ViewOnly = ({ isLoading, isViewOnlyOpen, setIsViewOnlyOpen, translations }) => {

  const closeModal = () => {
    setIsViewOnlyOpen(false)
  }

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
      <Transition appear show={isViewOnlyOpen} as={Fragment}>
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
                      {translations.rawData}
                    </p>
                    <p className=''>
                      {translations?.terms?.map((term) => (
                        <> {term.target}</> 
                      ))}
                    </p>
                  </div>
                  <div className=' border-neutral-300 w-full py-2 '>
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
                              </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default ViewOnly