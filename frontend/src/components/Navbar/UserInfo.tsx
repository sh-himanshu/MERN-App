import { Avatar, Typography } from "@mui/material";

interface UserInfoProps {
  imageUrl: string;
  name: string;
}

const UserInfo = ({ imageUrl, name }: UserInfoProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar alt={name} src={imageUrl} />

      <Typography
        variant="h6"
        sx={{
          ml: 1,
          mr: 2,
        }}
      >
        {name}
      </Typography>
    </div>
  );
};

export default UserInfo;
