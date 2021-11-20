import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  IconButton,
  Stack,
} from "@mui/material";

import LikeButton from "./LikeButton";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { PostRespose } from "../../../api";
import moment from "moment";
import { useAppDispatch } from "../../../app/hooks";
import { deletePost, likePost } from "../../../features/posts/postsSlice";

interface Props {
  post: PostRespose;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Post({ post, setCurrentId }: Props) {
  const {
    creator,
    title,
    message,
    tags,
    selectedFile: image,
    _id,
    createdAt,
    likeCount,
  } = post;
  const dispatch = useAppDispatch();
  return (
    <Card
      key={_id}
      variant="outlined"
      sx={{
        position: "relative",
        maxWidth: 340,
        border: "0",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardHeader
        action={
          <IconButton
            aria-label="edit"
            sx={{
              color: "inherit",
            }}
            onClick={() => {
              setCurrentId(_id);
            }}
          >
            <ModeEditOutlinedIcon />
          </IconButton>
        }
        title={<Typography variant="subtitle1">{creator}</Typography>}
        subheader={
          <Typography variant="caption">{moment(createdAt).fromNow()}</Typography>
        }
        sx={{
          position: "absolute",
          width: "100%",
          boxSizing: "border-box",
          color: (theme) => theme.palette.primary.contrastText,
          zIndex: 1,
        }}
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={
          image ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        alt={title}
        sx={{ filter: "brightness(0.8)", zIndex: 0 }}
      />

      <CardContent>
        <Typography
          variant="caption"
          sx={{
            fontStyle: "italic",
          }}
        >
          {tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="h6" sx={{ margin: "20px 0" }}>
          {title}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </CardContent>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          boxSizing: "border-box",
          p: 2,
        }}
      >
        <LikeButton likeCount={likeCount} onClick={() => dispatch(likePost(post))} />
        <Fab
          size="medium"
          sx={{ "&:hover": { backgroundColor: "#df1919" } }}
          aria-label="delete"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteRoundedIcon />
        </Fab>
      </Stack>
    </Card>
  );
}
