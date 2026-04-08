import { UserService } from "../services/user.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userService = new UserService();

export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const result = await userService.listUsers(req.query);

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: result.users,
    pagination: result.pagination,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, req.user.id);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role, req.user.id);

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.status, req.user.id);

  res.status(200).json({
    success: true,
    message: "User status updated successfully",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
