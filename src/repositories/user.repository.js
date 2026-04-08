import { User } from "../models/User.js";

export class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    return includePassword ? query.select("+password") : query;
  }

  async findById(id) {
    return User.findById(id);
  }

  async list({ role, status, page = 1, limit = 10 }) {
    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return User.findByIdAndDelete(id);
  }

  async count() {
    return User.countDocuments();
  }
}
