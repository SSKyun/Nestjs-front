import { useState } from "react";
import { Board } from "@/pages/boards/interface/board";
import Link from "next/link";
import authRequest from "@/utils/request/authRequest";

type Props = {
  board: Board;
};

const EditBoard = ({ board }: Props) => {
  const [id,setId] = useState(board.id);
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('작동',id)
    e.preventDefault();
    try {
      authRequest.patch(`http://localhost:8000/boards/${id}`,{
        title,
        description
      })
      .then((res)=>{
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>글 수정하기</h1>
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          내용
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <Link href={'/boards/main'}><button onClick={handleSubmit}>저장</button></Link>
    </div>
  );
};

// 수정할 게시글 데이터를 서버에서 불러옴
export async function getServerSideProps(context: { query: { id: any; }; }) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:8000/boards/${id}`);
  const board = await res.json();
  return {
    props: {
      board,
    },
  };
}

export default EditBoard;