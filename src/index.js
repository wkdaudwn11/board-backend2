import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";

import helloRouter from "./routes/hello";

// express 서버 객체 생성
const app = express();

// express 서버 세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// router setting
app.use("/", helloRouter);

const PORT = 4000; // 서버 PORT 지정

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

// 서버 시작
app.listen(PORT, handleListening());
