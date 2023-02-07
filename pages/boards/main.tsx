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
    
    useEffect(()=>{
        const foo =async()=>{
            await authRequest.get("/boards",{

            }).then((res)=>{
                console.log(res.data);
                //router.replace("/");
                if(res.data.length>0){
                    // return res.map((data)=>{
                    //     <div key={data.id}>{data.title}</div>
                    // });
                }
            }).catch(()=>{
                router.replace("../auth/login");
            });
        }
        foo();
    },[])
    return(
        <div>
            <div>게시판</div>
            <button><Link href={"/boards/create"}>글쓰기</Link></button>
        </div>
    );
}
export default BoardPage;