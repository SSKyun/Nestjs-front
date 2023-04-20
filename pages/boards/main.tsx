import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import authRequest from "@/utils/request/authRequest";
import Link from "next/link";
import { Board } from "../boards/interface/board";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';

type Post = {
  board: Board;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto",
    },
    table: {
      minWidth: 650,
    },
    title: {
      cursor: "pointer",
    },
  })
);

const Boards = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();

  const classes = useStyles();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await authRequest.get<Board[]>(
        "http://localhost:8000/boards"
      );
      const user = await getUser();
      const allBoards = response.data.filter(
        (board) =>
          board.user.id === user.id ||
          board.status === "PUBLIC" ||
          board.status === "PRIVATE"
      );
      allBoards.sort((a, b) => (a.createDate < b.createDate ? 1 : -1));
      const posts = allBoards.map((board) => ({ board }));
      setPosts(posts);
    } catch (error) {
      window.alert("로그인이 필요한 서비스 입니다.(세션 만료)");
      router.replace("/login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await authRequest.get("http://localhost:8000/auth");
      setId(response.data.id);
      return response.data;
    } catch (error) {
      console.log("getUser 에러");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchPosts();
    };
    fetchData();
  }, []);

  return (
    <>
    {loading && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-75 z-50 flex items-center justify-center">
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
          <h2 className="font-semibold text-lg">Loading...</h2>
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="animate-spin h-5 w-5 mr-3 border-l-2 border-gray-900"
            >
              <circle cx="12" cy="12" r="10" className="opacity-25" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4.914 13.13a8 8 0 0 0 11.314 0l1.414 1.414a10 10 0 1 1-14.142 0l1.414-1.414zm14.142-2.828a8 8 0 0 0-11.314 0L6.342 9.868a10 10 0 1 1 14.142 0l-1.414 1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
    )}
      <h1 className="text-3xl text-center my-8">FAQ</h1>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Nickname</TableCell>
              <TableCell align="center">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.board.id}>
                <TableCell component="th" scope="row">
                  {post.board.id}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.title}
                  onClick={() => {
                    post.board.status === "PRIVATE"
                      ? router.push(`/boards/show/${post.board.id}`)
                      : router.push(`/boards/show/${post.board.id}`);
                  }}
                >
                  {post.board.status === "PRIVATE"
                    ? "비공개 게시글"
                    : post.board.title}
                </TableCell>
                <TableCell align="center">
                  {post.board.user.nickname}
                </TableCell>
                <TableCell align="center">
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href={"/boards/create"}>
        <Button
          variant="contained"
          color="primary"
        >
          글쓰기
        </Button>
      </Link>
    </>
  );
}

export default Boards;