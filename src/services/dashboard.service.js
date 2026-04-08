import { RecordRepository } from "../repositories/record.repository.js";

export class DashboardService {
  constructor() {
    this.recordRepository = new RecordRepository();
  }

  async getSummary() {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [totals, categoryTotals, recentActivity, monthlyTrends] = await Promise.all([
      this.recordRepository.aggregate([
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]),
      this.recordRepository.aggregate([
        {
          $group: {
            _id: {
              type: "$type",
              category: "$category",
            },
            total: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            type: "$_id.type",
            category: "$_id.category",
            total: 1,
          },
        },
        {
          $sort: { total: -1 },
        },
      ]),
      this.recordRepository.aggregate([
        { $sort: { date: -1, createdAt: -1 } },
        { $limit: 5 },
        {
          $project: {
            amount: 1,
            type: 1,
            category: 1,
            date: 1,
            notes: 1,
          },
        },
      ]),
      this.recordRepository.aggregate([
        {
          $match: {
            date: { $gte: sixMonthsAgo, $lte: now },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
              type: "$type",
            },
            total: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            type: "$_id.type",
            total: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]),
    ]);

    const income = totals.find((item) => item._id === "income")?.total || 0;
    const expenses = totals.find((item) => item._id === "expense")?.total || 0;

    return {
      totals: {
        income,
        expenses,
        netBalance: income - expenses,
      },
      categoryTotals,
      recentActivity,
      monthlyTrends,
    };
  }
}
