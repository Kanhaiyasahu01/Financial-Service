import { RecordRepository } from "../repositories/record.repository.js";
import { ApiError } from "../utils/apiError.js";

export class FinancialRecordService {
  constructor() {
    this.recordRepository = new RecordRepository();
  }

  async createRecord(data, userId) {
    return this.recordRepository.create({
      ...data,
      createdBy: userId,
    });
  }

  async listRecords(query) {
    const filter = {};

    if (query.type) {
      filter.type = query.type;
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) {
        filter.date.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        filter.date.$lte = new Date(query.endDate);
      }
    }

    if (query.search) {
      filter.notes = { $regex: query.search, $options: "i" };
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const sortBy = query.sortBy || "date";
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;

    return this.recordRepository.list({
      filter,
      page,
      limit,
      sort: { [sortBy]: sortOrder, createdAt: -1 },
    });
  }

  async getRecordById(id) {
    const record = await this.recordRepository.findById(id);

    if (!record) {
      throw new ApiError(404, "Record not found");
    }

    return record;
  }

  async updateRecord(id, data) {
    const updatedRecord = await this.recordRepository.updateById(id, data);

    if (!updatedRecord) {
      throw new ApiError(404, "Record not found");
    }

    return updatedRecord;
  }

  async deleteRecord(id) {
    const deletedRecord = await this.recordRepository.deleteById(id);

    if (!deletedRecord) {
      throw new ApiError(404, "Record not found");
    }

    return deletedRecord;
  }
}
