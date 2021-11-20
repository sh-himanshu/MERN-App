import { Fab } from "@mui/material";
import { useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeCount: number;
}

const LikeButton = ({ onClick, likeCount }: Props) => {
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
      <FavoriteRoundedIcon sx={{ mr: 1 }} />
      {likeCount}
    </Fab>
  );
};

export default LikeButton;
