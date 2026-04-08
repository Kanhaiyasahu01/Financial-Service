import { FinancialRecordService } from "../services/financialRecord.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const financialRecordService = new FinancialRecordService();

export const createRecord = asyncHandler(async (req, res) => {
  const record = await financialRecordService.createRecord(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Record created successfully",
    data: record,
  });
});

export const listRecords = asyncHandler(async (req, res) => {
  const result = await financialRecordService.listRecords(req.query);

  res.status(200).json({
    success: true,
    message: "Records fetched successfully",
    data: result.records,
    pagination: result.pagination,
  });
});

export const getRecordById = asyncHandler(async (req, res) => {
  const record = await financialRecordService.getRecordById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: record,
  });
});

export const updateRecord = asyncHandler(async (req, res) => {
  const record = await financialRecordService.updateRecord(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Record updated successfully",
    data: record,
  });
});

export const deleteRecord = asyncHandler(async (req, res) => {
  await financialRecordService.deleteRecord(req.params.id);

  res.status(200).json({
    success: true,
    message: "Record deleted successfully",
  });
});
