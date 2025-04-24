import User from "./userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid password");

  // Tạo JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role }, // Payload: thông tin người dùng
    process.env.JWT_SECRET, // Secret key từ .env
    { expiresIn: process.env.JWT_EXPIRES_IN } // Thời gian hết hạn (1h)
  );

  return { user, token };
};

export const logoutUser = async (token) => {
  // Trong môi trường production, bạn có thể lưu token vào blacklist (ví dụ: Redis)
  return { message: "Logged out successfully" };
};

export default { registerUser, loginUser, logoutUser };
