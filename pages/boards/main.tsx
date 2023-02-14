import authRequest from '@/utils/request/authRequest';
import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';


const BoardPage = () => {
    const router = useRouter();
    const [inputData, setInputData] = useState([{
        id : '',
        title : '',
        description : '',
        userId : '',
        created_at: ''
    }])

    // const createButton = () => {
    //     if(localStorage.getItem("kakao-Name") === undefined){
    //         router.push("/");
    //     }else{
    //         router.replace('/boards/create');
    //     }
    // }
    
    useEffect(()=>{
        const foo =async()=>{
            await authRequest.get("/boards",{
            }).then((res)=>{
                console.log(res.data);
                
            }).catch(()=>{
                router.push('/login');
            });
        }
        foo();
    },[])

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