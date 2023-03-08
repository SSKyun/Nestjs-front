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
        const filteredPosts = response.data.filter(board => board.status !== 'PRIVATE');
        const posts = filteredPosts.map((board) => ({
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
            <span className='post-id'>{post.board.id}</span>
            {post.board.status === 'PRIVATE' ? (
              <p className="post-title">비공개 게시글입니다.</p>
            ) : (
              <Link href={`/boards/show/${post.board.id}`}>
                <p className="post-title">{post.board.title}</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
      { /* 작성자와 루트 사용자를 제외한 사용자는 볼 수 없게 수정 */ }
      { /* 여기에 해당 사용자의 role에 따른 로직을 추가해주세요 */ }
      <Link href={"/boards/create"}>글쓰기</Link>
    </div>
  );
};

export default Boards;