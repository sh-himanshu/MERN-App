import { Button, Paper, TextField, Typography } from "@mui/material";

import { MuiForm } from "../custom/Styled";
import { Post } from "../../api";
import React, { useEffect } from "react";
import ReactImg64 from "../ReactImg64/ReactImg64";
import { createPost, updatePost } from "../../features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";

interface Props {
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ currentId, setCurrentId }: Props) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    currentId !== "0" ? state.posts.find((e) => e._id === currentId) : null
  );

  const initialState: Post = {
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    likeCount: 0,
  };

  const [postData, setPostData] = useState(initialState);

  const fileLabelInitialState = "Upload from storage.";
  const [fileLabel, setFileLabel] = useState(fileLabelInitialState);

  useEffect(() => {
    if (post) {
      const { creator, title, message, tags, selectedFile, likeCount } = post;
      setPostData({
        creator,
        title,
        message,
        tags,
        selectedFile,
        likeCount,
      });
    }
  }, [post]);

  const clear = () => {
    setPostData(initialState);
    setFileLabel(fileLabelInitialState);
    setCurrentId("0");
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postData === initialState) {
      alert("Cannot Submit Empty POST !");
      return;
    }

    currentId === "0"
      ? dispatch(createPost(postData))
      : dispatch(updatePost({ _id: currentId, post: postData }));

    clear();
  };

  return (
    <Paper
      sx={{
        padding: 1,
        mb: 4,
        maxWidth: "400px",
      }}
    >
      <MuiForm
        autoComplete="off"
        noValidate
        sx={{
          margin: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        onSubmit={handleSumbit}
      >
        <Typography variant="h6">
          {currentId === "0" ? "Creating a Memory" : `Editing '${post.title}'`}
        </Typography>
        <TextField
          sx={{
            mt: 1,
            mb: 1,
          }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          sx={{ mb: 1 }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ mb: 1 }}
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
          sx={{ mb: 1 }}
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
          fileLabel={fileLabel}
          setFileLabel={setFileLabel}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ my: 1, borderRadius: 5, py: 1 }}
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
          sx={{ borderRadius: 5, py: 1 }}
        >
          Clear
        </Button>
      </MuiForm>
    </Paper>
  );
};

export default Form;
