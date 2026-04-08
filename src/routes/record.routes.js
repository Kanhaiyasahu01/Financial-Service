import { Router } from "express";
import {
  createRecord,
  deleteRecord,
  getRecordById,
  listRecords,
  updateRecord,
} from "../controllers/financialRecord.controller.js";
import { ROLES } from "../constants/roles.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  createRecordValidator,
  listRecordsValidator,
  recordIdParamValidator,
  updateRecordValidator,
} from "../validators/record.validator.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  authorize(ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN),
  listRecordsValidator,
  validateRequest,
  listRecords
);
router.get(
  "/:id",
  authorize(ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN),
  recordIdParamValidator,
  validateRequest,
  getRecordById
);
router.post(
  "/",
  authorize(ROLES.ADMIN),
  createRecordValidator,
  validateRequest,
  createRecord
);
router.patch(
  "/:id",
  authorize(ROLES.ADMIN),
  updateRecordValidator,
  validateRequest,
  updateRecord
);
router.delete(
  "/:id",
  authorize(ROLES.ADMIN),
  recordIdParamValidator,
  validateRequest,
  deleteRecord
);

export default router;
