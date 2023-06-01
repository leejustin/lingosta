import Link from 'next/link'
import React, { useState } from 'react'

const PrevTranslationsList = ({ translationsList}) => {

    const [isLoading, setIsLoading] = useState();

  return (
    <div className=''>
    <div className='mt-4 text-lg font-semibold'>
        Previous translations:
    </div>
    <div className='mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-2'>
        {translationsList.map((data, index) => (
            <Link key={index} href={`/translate/${data.id}`}>
            <div className='flex shadow-md h-24 max-w-xl p-6 text-center items-center justify-center rounded-xl bg-slate-300 hover:bg-slate-400 transition'>
                    <p className=''>{data.rawData}</p>
            </div>
            </Link>
        ))}
    </div>
</div>  )
}

export default PrevTranslationsList