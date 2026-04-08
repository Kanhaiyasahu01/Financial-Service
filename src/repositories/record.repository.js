import { FinancialRecord } from "../models/FinancialRecord.js";

export class RecordRepository {
  async create(data) {
    return FinancialRecord.create(data);
  }

  async findById(id) {
    return FinancialRecord.findById(id);
  }

  async list({ filter, page, limit, sort }) {
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      FinancialRecord.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "name email role"),
      FinancialRecord.countDocuments(filter),
    ]);

    return {
      records,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateById(id, data) {
    return FinancialRecord.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email role");
  }

  async deleteById(id) {
    return FinancialRecord.findByIdAndDelete(id);
  }

  async aggregate(pipeline) {
    return FinancialRecord.aggregate(pipeline);
  }
}
