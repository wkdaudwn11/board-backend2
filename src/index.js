import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import helloRouter from "./routes/hello";

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () =>
  console.log(`Connected to mongo server: ${process.env.MONGO_URL}...`)
);

// express 서버 객체 생성
const app = express();

// express 서버 세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// router setting
app.use("/", helloRouter);

const handleListening = () =>
  console.log(`Listening on: http://localhost:${process.env.PORT}`);

// 서버 시작
app.listen(process.env.PORT, handleListening());
