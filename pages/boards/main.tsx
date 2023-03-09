import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import authRequest from "@/utils/request/authRequest";
import Link from "next/link";
import { Board } from "../boards/interface/board";

type Post = {
  board: Board;
};

const Boards = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [id,setId] = useState();
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await authRequest.get<Board[]>(`http://localhost:8000/boards`);
      const user = await getUser();
      const userBoards = response.data.filter((board) => board.status !== "PRIVATE" || board.user.id === user.id);
      const posts = userBoards.map((board) => ({ board }));
      setPosts(posts);
    } catch (error) {
      window.alert("로그인이 필요한 서비스 입니다.(세션 만료)");
      router.replace("/login");
      console.error(error);
    }
  };
  
  const getUser = async () => {
    try {
      const response = await authRequest.get("http://localhost:8000/auth");
      return response.data;
    } catch (error) {
      console.log("getUser 에러");
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      <ul id="post-list">
      {posts.map((post) => (
        <li key={post.board.id} className="post-item">
          <span className='post-id'>{post.board.id}</span>
          {post.board.status === 'PRIVATE' ? (
            <Link href={`/boards/show/${post.board.id}`}>
              <p className="post-title">비공개 게시글</p>
            </Link>
          ) : (
            <Link href={`/boards/show/${post.board.id}`}>
              <p className="post-title">{post.board.title}</p>
            </Link>
          )}
        </li>
      ))}
      </ul>
      <Link href={"/boards/create"}>글쓰기</Link>
    </div>
  );
};

export default Boards;