import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const Container = styled(animated.div)`
  height: ${(props) => props.height}px;
  overflow: hidden;
  position: relative;
`;

const Slide = styled(animated.div)`
  height: 100%;
  display: block;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.bgColor};
    opacity: 0.7;
  }
`;

const SlideContent = styled.div`
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  filter: brightness(75%);
  padding-top: ${(props) => props.headerHeight}px;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
  }
`;

const slides = [
  {
    bgColor: '#5cb85c',
    img: '/farm.jpg',
    title: 'Slide 1',
    description: 'Description 1',
  },
  {
    bgColor: '#5bc0de',
    img: '/farm2.jpg',
    title: 'Slide 2',
    description: 'Description 2',
  },
  {
    bgColor: '#f0ad4e',
    img: '/farmmain.jpg',
    title: 'Slide 3',
    description: 'Description 3',
  },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true, 
    autoplaySpeed: 5000, 
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      setContainerHeight(getContainerHeight()); // 컨테이너 높이 계산 후 초기화
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      setContainerHeight(getContainerHeight()); // 컨테이너 높이 재계산
    }
  };

  const getContainerHeight = () => {
    if (typeof window !== 'undefined') {
      const header = document.querySelector('header');
      const headerHeight = header ? header.clientHeight : 0;
      const containerPadding = 0; // Container 요소의 padding 값
      return window.innerHeight - headerHeight - containerPadding;
    }
    return 0;
  };

  return (
    <div>
    <Container height={containerHeight}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Slide>
            <SlideContent>
              <img
                src={slide.img}
                alt={`slide${index}`}
              />
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </SlideContent>
          </Slide>
        ))}
      </Slider>

    </Container>
    </div>
  );
}