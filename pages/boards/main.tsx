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
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await authRequest.get<Board[]>("http://localhost:8000/boards");
        const posts = response.data.map((board) => ({
          board,
        }));
        setPosts(posts);
      } catch (error) {
        window.alert("다시 로그인 해 주십시오");
        router.replace('/login');
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Boards</h1>
      <ul id="post-list">
        {posts.map((post) => (
          <li key={post.board.id} className="post-item">
            <Link href={`/boards/show/${post.board.id}`}>
              <p className="post-title">{post.board.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={"/boards/create"}>글쓰기</Link>
    </div>
  );
};

export default Boards;