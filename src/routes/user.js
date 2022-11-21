import express from "express";
import { joinUser, loginUser } from "../controllers/user";

const router = express.Router();

router.post("/join", joinUser); // [POST] /user/join
router.post("/login", loginUser); // [POST] /user/login (body에 감싸서 받는 API도 보통은 POST)

export default router;
