import authRequest from "@/utils/request/authRequest";
import { useRouter } from "next/router";
import React , {useState} from "react"

const CreateBoard = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [status,setStatus] = useState("PUBLIC");
    const router = useRouter();

    function create(){

        console.log(status)
        authRequest.post('/boards',{
            title,
            description,
            status,
        })
        .then((res)=>{
            console.log(res.data);
            router.replace('/boards/main');
        })
        .catch((error)=>{
            if(error.response && error.response.status === 401){
                alert("로그인을 다시 해주세요.");
            } else {
                console.log(error);
                alert("정확하게 입력해 주세요.");
            }
        });
    }

    return(
        <>
            <h1>글쓰기</h1>
            <div>제목</div>
            <input placeholder="제목 입력" onChange={(e)=>{setTitle(e.target.value)}}/>
            <br/>
            <textarea placeholder="내용 입력" onChange={(e)=>{setDescription(e.target.value)}}/>
            <br />
            <label>
                <input type="radio" value="PUBLIC" checked={status === "PUBLIC"} onChange={(e)=>{setStatus(e.target.value)}}/>
                공개
            </label>
            <br />
            <label>
                <input type="radio" value="PRIVATE" checked={status === "PRIVATE"} onChange={(e)=>{setStatus(e.target.value)}}/>
                비공개
            </label>
            <br />
            <button onClick={()=>{create();}}>저장</button>
        </>
    )
}

export default CreateBoard;