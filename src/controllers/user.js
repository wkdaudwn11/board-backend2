import User from "../models/user";

export const joinUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    const data = new User({
      email,
      password,
      salt: "123",
      name,
      age,
    });

    // RDB
    // SELECT => 조회
    // INSERT => 삽입
    // UPDATE => 수정
    // DELETE => 삭제

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
