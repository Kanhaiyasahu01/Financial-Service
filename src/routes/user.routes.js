import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { ROLES } from "../constants/roles.js";
import {
  createUserValidator,
  listUsersValidator,
  updateUserValidator,
  userIdParamValidator,
} from "../validators/user.validator.js";

const router = Router();

router.use(authenticate, authorize(ROLES.ADMIN));

router.post("/", createUserValidator, validateRequest, createUser);
router.get("/", listUsersValidator, validateRequest, listUsers);
router.get("/:id", userIdParamValidator, validateRequest, getUserById);
router.patch("/:id", updateUserValidator, validateRequest, updateUser);
router.delete("/:id", userIdParamValidator, validateRequest, deleteUser);

export default router;
