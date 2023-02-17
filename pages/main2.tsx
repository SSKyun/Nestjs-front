import * as React from 'react';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { kakaoInit } from '../utils/kakao/kakaoinit';
import axios from 'axios';
import { useState } from 'react';
import mainRequest from '@/utils/request/mainReqeust';

const SERVER_URL = "http://localhost:8000/auth/signup";
const SERVER_URL2 = "http://localhost:8000/auth/signin";

const Index = () => {
    const [f_id,setF_id] = useState(""); // 비번이랑 휴대폰번호 해야댐.
    const [f_name,setF_name] = useState("");
    const router = useRouter();

    const kakaoLogin = async () => {

        const kakao = kakaoInit();
        

        // 카카오 로그인 구현
        kakao.Auth.login({
            
            success: () => {
                kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    success: (res: any) => {
                        // console.log(res.properties.nickname)
                        setF_id(res.kakao_account.email);
                        setF_name(res.properties.nickname);
                        console.log(res.kakao_account.email)
                        axios.post(SERVER_URL,{ //회원가입
                            username : f_id,
                            password : "qwer123!", //보류
                            nickname : f_name,
                            phone_number : "01083147735", //보류
                        }).then((res)=>{//처음 로그인이라면 
                            console.log("첫번째 로그인 시도 전")
                            mainRequest.post(SERVER_URL2,{
                                username : f_id,
                                password : "qwer123!",
                            }).then((res)=>{
                                console.log(`${res} 첫번째 로그인 성공`);
                                router.replace('/');
                            }).catch((err)=>{
                                console.log(`${err} 첫번째 로그인 실패`);
                            })
                        }).catch((err)=>{ //실패시(db가 있다면)
                            console.log(`${err} 첫번째 실패후 로그인 전`);
                            mainRequest.post(SERVER_URL2,{
                                username : f_id,
                                password : "qwer123!"
                            }).then((res)=>{
                                console.log(`${res} n번째 로그인 성공`)
                                router.replace('/');
                            }).catch((err)=>{
                                console.log(`${err} n번째 로그인 실패`);
                                
                            })
                        })
                        // console.log("씨발")
                        // Router.push('/kakao');
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