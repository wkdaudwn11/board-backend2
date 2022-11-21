import jwt from "jsonwebtoken";

import User from "../models/user";
import { createHashedPassword, verifyPassword } from "../lib/auth";

export const joinUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    const checkEmail = await User.findOne({
      email,
    });

    if (checkEmail) throw new Error("email already exists");

    const { hashedPassword, salt } = await createHashedPassword(password);

    const data = new User({
      email,
      password: hashedPassword,
      salt,
      name,
      age,
    });

    await data.save(); // User Schema Insert(삽입)하는 과정

    res.send({
      success: true,
      message: null,
      data,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 존재하는 유저인지 체크
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // 비밀번호 맞는지 체크
    const verified = await verifyPassword(password, user.salt, user.password);
    if (!verified) throw new Error("Password does not match");

    // 토큰 발행 (JWT)
    const payload = {
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: null,
      data: {
        accessToken,
      },
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
