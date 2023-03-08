import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import authRequest from "@/utils/request/authRequest";
import { Board } from "@/pages/boards/interface/board";

const EditBoard = () => {
  const router = useRouter();
  const [boardId, setBoardId] = useState<string>("");
  const [board, setBoard] = useState<Board | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await authRequest.get<Board>(`http://localhost:8000/boards/${boardId}`);
        setBoard(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error(error);
      }
    };

    if (boardId) {
      fetchBoard();
    }
  }, [boardId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await authRequest.patch(`http://localhost:8000/boards/${board?.id}`, {
        title,
        description,
      });
      window.alert("수정 완료");
      router.replace("/boards/main");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (router.query.id) {
      setBoardId(router.query.id as string);
    }
  }, [router.query.id]);

  return (
    <div>
      {board ? (
        <form onSubmit={handleSubmit}>
          <h1>게시글 수정</h1>
          <div>
            <label htmlFor="title">제목</label>
            <input id="title" type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="description">내용</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} />
          </div>
          <button type="submit">수정</button>
        </form>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default EditBoard;