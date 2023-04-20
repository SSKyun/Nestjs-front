import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  height: 100vh;
  background-color: green;
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
  background-color: white;
  overflow-y: scroll;
  padding: 20px;
`;

export default function Home() {
  return (
    <div>
      <Background />
      <ScrollSection>
        <div>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
          <p>스크롤이 가능한 내용들을 이곳에 넣어주세요.</p>
        </div>
      </ScrollSection>
    </div>
  );
}