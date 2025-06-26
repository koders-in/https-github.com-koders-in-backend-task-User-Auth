import { generateToken } from "./jwToken.js";

export const sendToken = (user, res, message = "Success") => {
  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
