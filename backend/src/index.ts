import initApp from "./app";
import mongoose from "mongoose";
import { parseError } from "./utils";

process.env.DATABASE_URI
  ? mongoose
      .connect(process.env.DATABASE_URI)
      .then(initApp)
      .catch((error) => console.error(parseError(error)))
  : console.error("'DATABASE_URI' is missing !");
