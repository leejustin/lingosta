import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';

const TranslateModal = ({ isLoading, handleSave, input, setIsOpen, translations }) => {

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center'>
      {isLoading ? (<p className='text-white text-3xl'>loading...</p>) : (
      <div className='absolute flex flex-col mx-auto overflow-y-auto h-auto w-2/3 max-w-xl bg-slate-200 rounded-md'>
      <button className='px-2 mt-2 text-gray-700 font-semibold text-xl place-self-end ml-auto border-0 hover:opacity-70 transition' onClick={() => setIsOpen(false)}>
        <AiOutlineClose size={20} className=''/>
      </button>
        <div className=' border-b-[1px] border-neutral-300 w-full p-4  text-lg'>
          <p>
          {input}
          </p>
          <p>
            {translations.sentence}
          </p>
        </div>
        <div className='border-b-[1px] border-neutral-300 w-full p-4'>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-left text-lg'>
              <tbody>
                {translations.terms?.map((term, id) => (
                    <tr className='' key={id}>
                      <td className=''>
                        {term.source}
                      </td>
                      <td className=''>
                        {term.target}
                      </td>
                      <td className="w-4 p-4">
                      <div className="flex items-center">
                          <input type='checkbox' className="w-5 h-5 text-black border-gray-300 rounded " />
                      </div>
                  </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex flex-row p-4 space-x-2'>
          <Button label='Close' onClick={() => setIsOpen(false)}/>
          <Button label='Save' onClick={() => handleSave()}/>
        </div>
      </div>
      )}
    </div>
  )
}

export default TranslateModal