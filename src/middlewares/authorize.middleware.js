import { ApiError } from "../utils/apiError.js";

export const authorize = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "You are not allowed to perform this action");
    }

    next();
  };
};
