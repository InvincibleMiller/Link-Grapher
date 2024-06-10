import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";

import apiRouter from "./routers/api";

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Configure express middleware for post requests
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONT_END_DOMAIN || "http://localhost:3000",
    ],
  })
);

// use routers
app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running on port ${PORT}`);
});
