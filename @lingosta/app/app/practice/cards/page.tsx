"use client";
import React, { useContext, useState, useEffect } from 'react';
import { TranslationsContext } from '../../../providers/SelectedTranslationsProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Navigation } from 'swiper';
import { Flashcard } from 'react-quizlet-flashcard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { Term } from "../../../models";


const Practicing: React.FC = () => {
    const [selectedTranslations, setSelectedTranslations] = useContext(TranslationsContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedTranslations = localStorage.getItem('selectedTranslations');
        if (storedTranslations) {
            setIsLoading(true)
            setSelectedTranslations(JSON.parse(storedTranslations));
            setIsLoading(false)
        }
    }, []);

    return (
      <main className="md:px-5 mt-8 flex mx-auto items-center justify-center overflow-x-hidden">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
                {selectedTranslations.map((data, index: number) => (
                  <div key={index} className="max-w-xs md:max-w-xl mt-12 space-y-2">
                      <span className="text-lg font-bold">{data.rawData}</span>
                      <Swiper
                        key={index}
                        className=""
                        rewind={true}
                        effect="cards"
                        navigation={true}
                        grabCursor={true}
                        modules={[EffectCards, Pagination, Navigation]}
                        cardsEffect={{
                            slideShadows: false,
                            rotate: false,
                        }}
                        pagination={{
                            type: 'progressbar',
                        }}
                      >
                          {data.terms.map((term: Term, index: number) => (
                            <SwiperSlide key={index}>
                                <div className="p-8 md:p-12 flex text-3xl md:text-4xl font-semibold">
                                    <Flashcard
                                      frontHTML={term.source}
                                      backHTML={term.target}
                                      backContentStyle={{
                                          padding: '10px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          boxShadow: 'none',
                                          border: 0,
                                      }}
                                      frontContentStyle={{
                                          padding: '10px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          boxShadow: 'none',
                                          border: 0,
                                      }}
                                    />
                                </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                  </div>
                ))}
            </div>
          )}
      </main>
    );
};

export default Practicing;
