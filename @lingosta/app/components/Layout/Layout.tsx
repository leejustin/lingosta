import React from 'react'


const Layout = ({ children }) => {

    return (
    <div className='container h-full mx-auto'>
        {children}
    </div>
    )
}

export default Layout