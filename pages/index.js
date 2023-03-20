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
import styled from "styled-components";



const Container = styled.div`
  background-image: url("farmmain.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
`;

const InnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  color : #FFFFFF;
`;
export default function Main() {
  SwiperCore.use([Navigation, Pagination, Autoplay]);


  return (
    <Container>
      <InnerContainer>
        <p>스크롤 가능한 콘텐츠</p>
      </InnerContainer>
    </Container>
  );
}


{/* <Image src={main} alt="Main Image" className="z-0 w-full" /> */}