import authRequest from "@/utils/request/authRequest";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Board } from "../interface/board";

const ShowBoard = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const router = useRouter();

  const showBoard = async (boardId: number) => {
    try {
      const response = await authRequest.get<Board>(`http://localhost:8000/boards/${boardId}`);
      setBoard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const boardId = Number(router.query.id);
      showBoard(boardId);
    }else{
      window.alert("다시 로그인 해 주세요.")
    }
  }, [router.query]);

  const deleteBoard = async () => {
    try {
      await authRequest.delete(`http://localhost:8000/boards/${board?.id}`);
      window.alert("삭제 완료");
      router.replace("/boards/main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {board ? (
        <>
          <h1>{board.title}</h1>
          <p>{board.description}</p>
          <Link href={`/boards/edit/${board.id}`}>수정 </Link>
          <button onClick={deleteBoard}>삭제 </button>
          <Link href={"/boards/main"}> 목록으로</Link>
        </>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default ShowBoard;