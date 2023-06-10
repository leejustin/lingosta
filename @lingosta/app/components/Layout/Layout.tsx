import React from 'react'

const Layout = ({ children }) => {

    return (
    <div className='min-h-screen bg-gray-100'>
        <div className='container md:w-full mx-auto max-w-5xl pb-16'>
            {children}
        </div>
    </div>
    )
}

export default Layout