import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';

interface Props {
    items: { date: string; description: string }[];
}

export const SliderBlock: React.FC<Props> = ({ items }) => (
    <>
        <button className='slider__btn slider__btn_prev'></button>
        <Swiper
            modules={[Navigation]}
            spaceBetween={80}
            slidesPerView={4}
            breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 25 },
                769: { slidesPerView: 3, spaceBetween: 80 },
                1025: { slidesPerView: 4, spaceBetween: 80 }
            }}
            navigation={{
                prevEl: '.slider__btn_prev',
                nextEl: '.slider__btn_next'
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {items.map(({ date, description }, i) => (
                <SwiperSlide key={i} className='slider__slide'>
                    <p className='slider__year'>{date}</p>
                    <p className='slider__description'>{description}</p>
                </SwiperSlide>
            ))}
        </Swiper>
        <button className='slider__btn slider__btn_next'></button>
    </>
);
