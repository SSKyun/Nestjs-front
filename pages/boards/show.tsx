import axios from "axios";
import Link from "next/link";
import React , {useState} from "react"

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

    return(
        <>

            <button><Link href={"/patch"}>수정</Link></button>
            {/* <button onClick={()=>{delete();}}>삭제</button> */}
        </>
    );
}

export default ShowBoard;