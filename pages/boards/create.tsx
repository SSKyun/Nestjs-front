import React, { useState } from "react";
import { useRouter } from "next/router";
import authRequest from "@/utils/request/authRequest";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PUBLIC");
  const router = useRouter();

  function create() {
    console.log(status);
    authRequest
      .post("/boards", {
        title,
        description,
        status,
      })
      .then((res) => {
        console.log(res.data);
        router.replace("/boards/main");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("로그인을 다시 해주세요.");
        } else {
          console.log(error);
          alert("정확하게 입력해 주세요.");
        }
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ marginBottom: "1rem" }}>글쓰기</h1>
      <TextField label="제목" placeholder="제목 입력" style={{ marginBottom: "1rem" }} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="내용" placeholder="내용 입력" multiline rows={4} style={{ marginBottom: "1rem" }} onChange={(e) => setDescription(e.target.value)} />
      <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginBottom: "1rem" }}>
        <FormControlLabel value="PUBLIC" control={<Radio />} label="공개" />
        <FormControlLabel value="PRIVATE" control={<Radio />} label="비공개" />
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={() => create()}>
        저장
      </Button>
    </div>
  );
};

export default CreateBoard;