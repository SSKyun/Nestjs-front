import * as React from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { kakaoInit } from '../utils/kakao/kakaoinit';

const Index = () => {
    
    const kakaoLogin = async () => {
        // 카카오 초기화
        const kakao = kakaoInit();

        // 카카오 로그인 구현
        kakao.Auth.login({
            success: () => {
                kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    //token : 'oauth/token',
                    // data: JSON.stringify({'token':authObj['access_token']}),
                    success: (res: any) => {
                        // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
                        console.log(res);
                        var accessToken = kakao.Auth.getAccessToken();
                        kakao.Auth.setAccessToken(accessToken);
                        Router.push('/kakao');
                    },
                    fail: (error: any) => {
                        console.log(error);
                    }
                })
            },
            fail: (error: any) => {
                console.log(error);
            }
        })
        
    }

    return (
        <Wrapper>
            <Header.Container>
                <Header.Title>로그인할 방법을 선택해주세요.</Header.Title>
            </Header.Container>

            <Button.Container>
                <Button.ButtonList>
                    <Button.KakaoButton onClick={kakaoLogin}>
                        <Button.ButtonText>Kakao</Button.ButtonText>
                    </Button.KakaoButton>
                </Button.ButtonList>
            </Button.Container>
        </Wrapper>
    )
}

export default Index;

const Wrapper = styled.div`
    max-width: 720px;

    margin: 0 auto;
`

const Header = {
    Container: styled.div`
        text-align: center;
    `,

    Title: styled.h2``,
}

const Button = {
    Container: styled.div``,

    ButtonList: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

    KakaoButton: styled.button`
        background-color: #fef01b;

        width: 360px;
        height: 40px;

        margin: 6px 0;

        border: none;
        border-radius: 6px;

        cursor: pointer;
    `,

    ButtonText: styled.h4`
        margin: 0;
        padding: 0;
        
        font-size: 18px;
        color: #ffffff;
    `,
}