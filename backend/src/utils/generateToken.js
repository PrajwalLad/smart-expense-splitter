import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = { userId: user._id, email: user.email, isOnboarded: user.isOnboarded };
  return jwt.sign(payload, process.env.JWT_SECRET);
}