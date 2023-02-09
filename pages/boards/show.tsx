import axios from "axios";
import Link from "next/link";
import React , {useEffect, useState} from "react"


const SHOW_SERVER_URL = "http://localhost:8000/boards"
const ShowBoard = () => {

    // function delete(id:number){
    //     axios.delete(`http://localhost:8000/boards/:${id}`)
    //     .then(()=>{
    //         console.log("Delete success");
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     });
    // }
    useEffect(()=>{
        axios.post(SHOW_SERVER_URL,{})
    },[])

    return(
        <>

            <button><Link href={"/patch"}>수정</Link></button>
            {/* <button onClick={()=>{delete();}}>삭제</button> */}
        </>
    );
}

export default ShowBoard;