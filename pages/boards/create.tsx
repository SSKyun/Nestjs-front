import authRequest from "@/utils/request/authRequest";
import { Alegreya } from "@next/font/google";
import axios from "axios";
import { useRouter } from "next/router";
import React , {useState} from "react"

const CreateBoard = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const router = useRouter();
    
    function create(){
        authRequest.post('/boards',{
            title,
            description,
            //status : "PUBLIC" 혹은 "PRIVATE" 라디오 버튼 같은 거 추가 시켜서 
        }).then((res)=>{
            console.log(res.data);
            router.replace('/boards/main');
        }).catch((err)=>{
            console.log(err);
            alert("정확하게 입력해 주세요.");
        })
    }

    return(
        <>
            <h1>글쓰기</h1>
            <div>제목</div>
            <input placeholder="제목 입력" onChange={(e)=>{setTitle(e.target.value)}}/>
            <br/>
            <textarea placeholder="내용 입력" onChange={(e)=>{setDescription(e.target.value)}}/>

            <button onClick={()=>{create();}}>저장</button>
        </>
    )
}

export default CreateBoard;