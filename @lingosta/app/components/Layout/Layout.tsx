import React from 'react'

const Layout = ({ children }) => {

    return (
    <div className='container h-full mx-auto max-w-2xl'>
        {children}
    </div>
    )
}

export default Layout