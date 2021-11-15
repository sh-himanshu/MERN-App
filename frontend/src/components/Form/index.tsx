import { Button, Paper, TextField, Typography } from "@mui/material";

import { MuiForm } from "../custom";
import { Post } from "../../api";
import React from "react";
import ReactImg64 from "../ReactImg64";
import { createPost } from "../../features/posts/postsSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";

const Form = () => {
  const dispatch = useAppDispatch();

  const initialState: Post = {
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };

  const clear = () => setPostData(initialState);

  const [postData, setPostData] = useState(initialState);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postData === initialState) {
      alert("Cannot Submit Empty POST !");
      return;
    }

    dispatch(createPost(postData));
    clear();
  };

  return (
    <Paper
      sx={{ padding: (theme) => theme.spacing(2), margin: (theme) => theme.spacing(1) }}
    >
      <MuiForm
        autoComplete="off"
        noValidate
        sx={{
          margin: (theme) => theme.spacing(1),
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        onSubmit={handleSumbit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          sx={{
            marginTop: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(1),
          }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          sx={{ marginBottom: (theme) => theme.spacing(1) }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ marginBottom: (theme) => theme.spacing(1) }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <ReactImg64
          onDone={({ base64 }) => {
            if (typeof base64 == "string" && base64 !== "") {
              setPostData({
                ...postData,
                selectedFile: base64,
              });
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ marginBottom: 1 }}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </MuiForm>
    </Paper>
  );
};

export default Form;
