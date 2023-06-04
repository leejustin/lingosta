"use client";
import React, { useContext, useState, useEffect } from 'react';
import { TranslationsContext } from '../../providers/SelectedTranslationsProvider';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper";
import { Flashcard } from "react-quizlet-flashcard";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
const Practicing = () => {

    const [selectedTranslations, setSelectedTranslations] = useContext(TranslationsContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const storedTranslations = localStorage.getItem('selectedTranslations');
        if (storedTranslations) {
            setSelectedTranslations(JSON.parse(storedTranslations));
        }
    }, []);

    const translations = selectedTranslations.map((translation) => translation.terms);

    return (
        <main className="z-0 mt-20 flex mx-auto items-center justify-center">
        {isLoading ? (<div>Loading...</div>) : (
            <div className='space-y-24'>
                {translations.map((array,index) => (
                    <Swiper
                        key={index}
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
                        {array.map((term,index) => (
                            <SwiperSlide key={index}>
                                <div className='p-8 md:p-12 flex text-3xl md:text-4xl font-semibold'>
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
                ))}
            </div>
        )}
    </main>
        
    )
}

export default Practicing