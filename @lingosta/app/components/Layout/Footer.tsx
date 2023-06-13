import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white/50 md:bg-gray-100 border-t-[1px] border-neutral-50 md:border-neutral-200 bg-backdrop-blur-sm max-w-5xl p-1 mx-auto absolute bottom-0 right-0 left-0'>
        <div className='mx-auto text-center'>
        <small className='text-gray-700'>
            &copy; Copyright 2023, Lingosta
        </small>
        </div>
    </footer>
  )
}

export default Footer