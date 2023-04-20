import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 500px;
  overflow-y: scroll;
`;

const Content = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const ScrollableComponent = () => {
  return (
    <Wrapper>
      <Content>
        <Image src="/image.jpg" />
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      </Content>
    </Wrapper>
  );
};

export default ScrollableComponent;