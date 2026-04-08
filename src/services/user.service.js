import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    return this.userRepository.create(data);
  }

  async listUsers(query) {
    return this.userRepository.list(query);
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async updateUser(id, data, actorId) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (String(user.id) === String(actorId) && data.status === "inactive") {
      throw new ApiError(400, "You cannot deactivate your own account");
    }

    return this.userRepository.updateById(id, data);
  }

  async deleteUser(id, actorId) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (String(user.id) === String(actorId)) {
      throw new ApiError(400, "You cannot delete your own account");
    }

    await this.userRepository.deleteById(id);
  }
}
