import Image from 'next/image';
import farm from '/public/farm.jpg';
import farm2 from '/public/farm2.jpg';
import farmmain from '/public/farmmain.jpg'
import forest from 'public/forest.jpg';
import { useRouter } from 'next/router';
import Head from "next/head";
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { useState } from 'react';
import 'swiper/css';
import SwiperCore,{ Navigation, Pagination, EffectFade, Autoplay } from 'swiper';


export default function Main() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);


  return (
    <>
    
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      onSlideChange={() => {}}
      onSwiper={(swiper) => console.log(swiper)}
      loop={true}
    >
      <SwiperSlide><Image src={farmmain} alt="Main Image" className="z-0 w-full h-1/2 " /></SwiperSlide>
      <SwiperSlide><Image src={farm} alt="Main Image" className="z-0 w-full h-1/2 " /></SwiperSlide>
      <SwiperSlide><Image src={farm2} alt="Main Image" className="z-0 w-full h-auto" /></SwiperSlide>
    </Swiper>
    <div className='my-36'>
      <div className='text-6xl font-bold text-center'>Auto Control</div>
      <div className='text-center mt-6 font-bold'>작물 생육정보와 환경정보에 대한
          데이터를 기반으로 최적 생육환경을 조성</div>
    </div>
    <div>
      <Image src={forest} alt="Main Image" className="z-0 w-full h-2/4 brightness-50 relative" />
      <div className='absolute'>test</div>
    </div>
  </>
  );
}


{/* <Image src={main} alt="Main Image" className="z-0 w-full" /> */}