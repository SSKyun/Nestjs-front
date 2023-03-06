import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const SERVER_URL_BOARDS = "localhost:8000/boards"

const BoardPage = () => {
    const router = useRouter();

    // const createButton = () => {
    //     if(localStorage.getItem("kakao-Name") === undefined){
    //         router.push("/");
    //     }else{
    //         router.replace('/boards/create');
    //     }
    // }
    
    // useEffect(()=>{
    //     const foo = async () => {
    //         await axios.get(SERVER_URL_BOARDS,{
    //         }).then((res)=>{
    //             console.log(res.data);
                
    //         }).catch((err)=>{
    //             console.log(err)
    //             window.alert("로그인이 필요한 서비스 입니다.")
    //             router.push('/login');
    //         });
    //     }
        
    // },[])

    const createBoard = () => {
        if(localStorage.getItem("kakao-Name") !== "undefined" || localStorage.getItem("name")){
            router.push("/boards/create");
        }else{
            router.replace("/");
        }
    }
    return(
        <div>
            <div>게시판</div>
            <button onClick={()=>{createBoard();}}>글쓰기</button>
        </div>
    );
}
export default BoardPage;