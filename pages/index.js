import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  height: 100vh;
  background-image: url('/farm2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-attachment: fixed;
`;

const ScrollSection = styled.div`
  height: 50vh;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  & > main-img-div {
    background-image: url('/farm.jpg');
    background-size: cover;
    background-position: center center;
    min-height: 100%;
    font-size: 2xl;
    font-weight: bold;
  }
`;

const ScrollableContent = styled.div`
  min-height: 100%;
`;

export default function Home() {
  
  return (
    <div>
      <Background />
      <ScrollSection>
        <main-img-div>Green Wishes</main-img-div>
      </ScrollSection>
    </div>
  );
}