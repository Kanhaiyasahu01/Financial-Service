import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authService = new AuthService();

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);


  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
      token,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body.email, req.body.password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
    },
  });
});
