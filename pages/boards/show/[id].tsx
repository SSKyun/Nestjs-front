import authRequest from "@/utils/request/authRequest";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Board } from "../interface/board";
import {
  Button,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

type Post = {
  board: Board;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    deleteButton: {
      color: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.light,
      },
    },
    buttonContainer: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

const ShowBoard = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const router = useRouter();
  const classes = useStyles();

  const showBoard = async (boardId: number) => {
    try {
      const response = await authRequest.get<Board>(`http://localhost:8000/boards/${boardId}`);
      const getUser = await authRequest.get("http://localhost:8000/auth");
      if (
        response.data.status === "PUBLIC" ||
        (response.data.status === "PRIVATE" && response.data.user.id === getUser.data.id)
      ) {
        setBoard(response.data);
      } else {
        window.alert("잘못된 접근입니다.");
        router.replace("/boards/main");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const boardId = Number(router.query.id);
      showBoard(boardId);
    } else {
      window.alert("다시 로그인 해 주세요.");
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
    <div className={classes.root}>
      <Paper>
        {board ? (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              {board.title}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {board.description}
            </Typography>
            <div className={classes.buttonContainer}>
              <Link href={`/boards/edit/${board.id}`} passHref>
                <Button variant="contained" color="primary" className={classes.button}>
                  수정
                </Button>
              </Link>
              <Button variant="contained" color="secondary" className={classes.button} onClick={deleteBoard}>
                삭제
              </Button>
              <Link href="/boards/main" passHref>
                <Button variant="outlined" color="primary" className={classes.button}>
                  목록으로
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Typography variant="body1" component="p">
            게시글을 불러오는 중입니다...
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default ShowBoard;