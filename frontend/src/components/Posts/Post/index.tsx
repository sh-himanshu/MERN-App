import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { PostRespose } from "../../../api";
import moment from "moment";

interface Props {
  post: PostRespose;
}

export default function Post({ post }: Props) {
  const { creator, title, message, tags, selectedFile: image, _id, createdAt } = post;
  return (
    <Card key={_id} variant="outlined" sx={{ position: "relative", maxWidth: 340 }}>
      <CardHeader
        action={
          <IconButton
            aria-label="edit"
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
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
        image={image}
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

      <Fab disabled aria-label="like">
        <FavoriteRoundedIcon />
      </Fab>
      <Fab sx={{ backgroundColor: "#df1919" }} aria-label="delete">
        <DeleteRoundedIcon />
      </Fab>
    </Card>
  );
}
