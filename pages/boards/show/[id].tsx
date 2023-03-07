import authRequest from "@/utils/request/authRequest";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Board } from "../interface/board";

const ShowBoard = () => {
    const [board, setBoard] = useState<Board | null>(null);
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
      const fetchBoard = async () => {
        try {
          const response = await authRequest.get<Board>(`http://localhost:8000/boards/${id}`);
          setBoard(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      if (id) {
        fetchBoard();
      }
    }, [id]);

    const deleteboard = () => {
        authRequest.delete('http://localhost:8000/boards',{})
        .then((res)=>{
            console.log(res);
            window.alert("삭제 완료");
            router.replace('boards/main');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  
    return (
      <div>
        {board ? (
          <>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
            <Link href={'/boards/patch'}>수정 </Link>
            <button onClick={deleteboard}>삭제 </button>
            <Link href={"/boards/main"}> 목록으로</Link>
          </>
        ) : (
          <p>게시글을 불러오는 중입니다...</p>
        )}
      </div>
    );
  };
  
  export default ShowBoard;
  