"use client";

import React, { useState, useEffect } from 'react'
import { useUser } from '../../providers/UserProvider'
import { useGroup } from '../../providers/GroupProvider';
import { getTranslation } from '../../helpers/TranslationHelper';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper";
import { Flashcard } from "react-quizlet-flashcard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";


const Test = () => {

    const { user } = useUser();
    const { activeGroup } = useGroup();
    const [translations, setTranslations] = useState([]);

    const translationsList = async() => {
        try {
            const response = await getTranslation('64716adaba890f82e6be');
            setTranslations(response.terms)
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        translationsList();
    }, [activeGroup])

    {!user && (<div>Loading...</div>)}
    return (
        <main className="z-0 mt-20 flex mx-auto items-center justify-center">
            <Swiper
                className='w-full max-w-sm md:max-w-xl'
                rewind={true}
                effect={"cards"}
                navigation={true}
                grabCursor={true}
                modules={[EffectCards, Pagination, Navigation]}
                cardsEffect={{
                    slideShadows: false,
                    rotate: false,
                }}
                pagination={{
                    type: "progressbar",
                }}
            >
            {translations.map((term,index) => (
                <SwiperSlide key={index}>
                    <div className='p-6 md:p-12 flex text-2xl font-semibold'>
                        <Flashcard 
                            frontHTML={term.source} 
                            backHTML={term.target} 
                            backContentStyle={{
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "none",
                                border: 0,
                            }}
                            frontContentStyle={{
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "none",
                                border: 0,
                                
                            }}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </main>
    )
}

export default Test