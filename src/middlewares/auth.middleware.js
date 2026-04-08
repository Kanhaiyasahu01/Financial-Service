import { ApiError } from "../utils/apiError.js";
import { verifyToken } from "../utils/jwt.js";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export const authenticate = async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authorization token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    const user = await userRepository.findById(payload.id);

    if (!user) {
      throw new ApiError(401, "Invalid token user");
    }

    if (user.status !== "active") {
      throw new ApiError(403, "User account is inactive");
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, "Invalid or expired token");
  }
};
