import { User } from "../models/User.js";

export class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByEmail(email, includePassword = false) {
    const query = User.findOne({
      email: email.toLowerCase(),
      isDeleted: { $ne: true },
    });
    return includePassword ? query.select("+password") : query;
  }

  async findById(id) {
    return User.findOne({ _id: id, isDeleted: { $ne: true } });
  }

  async list({ role, status, page = 1, limit = 10 }) {
    const filter = { isDeleted: { $ne: true } };

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
    return User.findOneAndUpdate({ _id: id, isDeleted: { $ne: true } }, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return User.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: "inactive",
      },
      { new: true }
    );
  }

  async count() {
    return User.countDocuments({ isDeleted: { $ne: true } });
  }
}
