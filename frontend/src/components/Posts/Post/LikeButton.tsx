import { Fab } from "@mui/material";
import { useState } from "react";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React from "react";

interface LikeButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeCount: number;
}

const LikeButton = ({ onClick, likeCount }: LikeButtonProps) => {
  const likeBtnDefault = {
    bg: "grey",
    svg: "black",
  };

  const [likeBtn, setLikeBtn] = useState(likeBtnDefault);

  return (
    <Fab
      aria-label="like"
      size="medium"
      variant="extended"
      sx={{
        bgcolor: likeBtn.bg,
        "&: hover": {
          "& svg": {
            color: likeBtn.svg,
          },
          "&: active": {
            "& svg": {
              color: "hotpink",
            },
          },
        },
      }}
      onClick={async (event) => {
        // Change color on press
        setLikeBtn((value) =>
          value.bg === "grey"
            ? {
                bg: "hotpink",
                svg: "hotpink",
              }
            : likeBtnDefault
        );

        // Fire Callback
        if (typeof onClick == "function") onClick(event);
      }}
    >
      <ThumbUpRoundedIcon sx={{ mr: 1 }} />
      {likeCount}
    </Fab>
  );
};

export default LikeButton;
