import { ROLES } from "../constants/roles.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const totalUsers = await this.userRepository.count();

    const user = await this.userRepository.create({
      ...data,
      role: totalUsers === 0 ? ROLES.ADMIN : ROLES.VIEWER,
    });

    const token = generateToken({ id: user.id, role: user.role });

    return {
      user,
      token,
    };
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email, true);

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (user.status !== "active") {
      throw new ApiError(403, "User account is inactive");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken({ id: user.id, role: user.role });

    return {
      user,
      token,
    };
  }
}
