'use client';

import React, { useState } from 'react'
import useUser from '../../../hooks/useUser'

const login = () => {

  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e:any) => {
    e.preventDefault()
    login(email, password);
  }

  return (
    <div className='mx-auto p-5'>
      <form onSubmit={handleLogin} className=''>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='text-black'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='text-black'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default login