import { Fab, Typography } from "@mui/material";
import { MuiInput, MuiLabel } from "../custom/index";
import React, { useState } from "react";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

interface ImgFile {
  name: string;
  type: string;
  size: string;
  base64: string | ArrayBuffer | null;
  file: File;
}

interface Props {
  onDone: (image: ImgFile) => void;
}

const ReactImg64 = ({ onDone }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    // Choosen file
    const file = event.target.files[0];

    setFileLabel(file.name);

    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // return the ImgFile
    reader.onload = () => {
      const fileInfo: ImgFile = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file,
      };
      onDone(fileInfo);
    };
    reader.onerror = (error) => {
      if (error instanceof Error) console.error(error.message);
    };
    // reader.onprogress = (progress) => {
    //   setvalue((progress.loaded * 100) / progress.total);
    // };
  };

  const [fileLabel, setFileLabel] = useState("");

  return (
    <MuiLabel
      htmlFor="icon-button-file"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        margin: (theme) => `${theme.spacing(2)} 0`,
      }}
    >
      <MuiInput
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={handleChange}
      />
      <Fab
        color="primary"
        aria-label="add image"
        component="span"
        variant="extended"
        size="medium"
        sx={{
          margin: (theme) => theme.spacing(1),
          backgroundColor: "#290b78",
        }}
      >
        <AddPhotoAlternateOutlinedIcon sx={{ mr: 1 }} /> Image
      </Fab>
      <Typography variant="body2" sx={{ maxWidth: "150px" }} noWrap={true}>
        {fileLabel || "Upload from storage."}
      </Typography>
    </MuiLabel>
  );
};

export default ReactImg64;
