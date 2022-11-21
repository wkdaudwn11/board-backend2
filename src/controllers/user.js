import User from "../models/user";
import { createHashedPassword } from "../lib/auth";

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
