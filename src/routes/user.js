import express from "express";
import { joinUser } from "../controllers/user";

const router = express.Router();

router.post("/join", joinUser); // [POST] /user/join

export default router;
