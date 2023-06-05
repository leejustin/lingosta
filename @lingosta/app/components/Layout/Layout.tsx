import React from 'react'

const Layout = ({ children }) => {

    return (
    <div className='min-h-screen bg-gray-100'>
        <div className='container mx-auto max-w-2xl pb-16 md:pb-0'>
            {children}
        </div>
    </div>
    )
}

export default Layout