import User from "../models/user";

export const joinUser = async (req, res) => {
  try {
    res.send({
      success: true,
      message: null,
      data: "join user",
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
