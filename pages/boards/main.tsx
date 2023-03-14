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
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();

  const classes = useStyles();

  const fetchPosts = async () => {
    try {
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
      <h1>FAQ</h1>
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