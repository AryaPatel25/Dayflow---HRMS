import express from 'express';
import {
  clockIn,
  clockOut,
  getMyAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController.js';

const router = express.Router();

// Employee routes
router.post('/clock-in', clockIn);
router.post('/clock-out', clockOut);
router.get('/my-attendance/:employeeId', getMyAttendance);

// Admin/HR routes
router.get('/all', getAllAttendance);
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;

