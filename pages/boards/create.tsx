import { Alegreya } from "@next/font/google";
import axios from "axios";
import { useRouter } from "next/router";
import React , {useState} from "react"

const CreateBoard = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const router = useRouter();
    
    function create(){
        axios.post("http://localhost:8000/boards",{
            title,
            description
        }).then((res)=>{
            console.log(res.data.id);
            router.replace("/boards/main");
        }).catch((error)=>{
            console.log(error)
        });
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