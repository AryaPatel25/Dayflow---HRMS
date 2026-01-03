import express from "express";
import auth from "../middlewares/auth.js";
import adminOnly from "../middlewares/adminOnly.js";

import {
  createEmployee,
  updateEmployee,
  deactivateEmployee,
  getEmployees,
  reactivateEmployee,
} from "../controllers/adminController.js";

const router = express.Router();

// Employee management routes
router.get("/employees", auth, adminOnly, getEmployees);
router.post("/employees", auth, adminOnly, createEmployee);
router.patch("/employees/:employeeId", auth, adminOnly, updateEmployee);
router.delete("/employees/:employeeId", auth, adminOnly, deactivateEmployee);
router.patch(
  "/employees/:employeeId/reactivate",
  auth,
  adminOnly,
  reactivateEmployee
);

export default router;
