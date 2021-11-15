import { config } from "dotenv";
import cors from "cors";
import express from "express";
import morganBody from "morgan-body";
import { normalizePort } from "./utils";
import postRouter from "./routes/posts";

// Load Config
config();

const PORT = normalizePort(process.env.PORT);
const app = express();

// Cross-origin resource sharing
app.use(cors());

// BodyParser
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// morganBody hook
morganBody(app, {
  logIP: true,
  logReqUserAgent: false,
});

// Routes
app.use("/posts", postRouter);

const initApp = () => {
  const server = app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

  process.on("SIGTERM", () => {
    console.debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.debug("HTTP server closed");
    });
  });
};

export default initApp;
