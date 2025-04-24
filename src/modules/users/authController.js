import { registerUser, loginUser, logoutUser } from "./authService.js";
export const registerHandler = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await registerUser(userData);
    res
      .status(201)
      .json({ user: newUser, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token, message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
};

export const logoutHandler = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const result = await logoutUser(token);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

export default { registerHandler, loginHandler, logoutHandler };
