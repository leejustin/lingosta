"use client";

import { useUser } from '../../providers/UserProvider'

import TranslateContainer from '../../components/Translate/TranslateContainer';

const Translate = () => {

    const { user } = useUser();
  
    if(!user) {
        return (
            <div className='mt-8 p-5 text-center'>
                loading
            </div>
        )
    }

    return (
        <TranslateContainer />
    )
}

export default Translate