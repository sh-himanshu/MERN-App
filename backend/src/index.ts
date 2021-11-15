import initApp from "./app";
import mongoose from "mongoose";

process.env.DATABASE_URI
  ? mongoose
      .connect(process.env.DATABASE_URI)
      .then(initApp)
      .catch((err) => console.error(err))
  : console.error("'DATABASE_URI' is missing !");
