import Attendance from '../models/Attendance.js';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

// Clock In
export const clockIn = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    const today = startOfDay(new Date());

    // Check if already clocked in today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lte: endOfDay(today),
      },
    });

    if (existingAttendance && existingAttendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked in today',
      });
    }

    const attendance = await Attendance.create({
      employeeId,
      date: today,
      checkIn: new Date(),
      status: 'Present',
    });

    res.status(201).json({
      success: true,
      data: attendance,
      message: 'Clocked in successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Clock Out
export const clockOut = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    const today = startOfDay(new Date());

    const attendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lte: endOfDay(today),
      },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No clock-in record found for today',
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked out today',
      });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(200).json({
      success: true,
      data: attendance,
      message: 'Clocked out successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get employee's own attendance (for employee view)
export const getMyAttendance = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { month, year, week, view } = req.query;

    let startDate, endDate;

    if (view === 'week') {
      // Weekly view
      const targetDate = week ? new Date(week) : new Date();
      startDate = startOfWeek(targetDate, { weekStartsOn: 1 }); // Monday
      endDate = endOfWeek(targetDate, { weekStartsOn: 1 }); // Sunday
    } else if (view === 'day') {
      // Daily view
      const targetDate = req.query.date ? new Date(req.query.date) : new Date();
      startDate = startOfDay(targetDate);
      endDate = endOfDay(targetDate);
    } else {
      // Monthly view (default)
      if (month && year) {
        startDate = startOfMonth(new Date(year, month - 1));
        endDate = endOfMonth(new Date(year, month - 1));
      } else {
        const now = new Date();
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
      }
    }

    const attendanceRecords = await Attendance.find({
      employeeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: -1 });

    // Calculate summary statistics
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter(
      (record) => record.status === 'Present' && record.checkOut
    ).length;
    const leaveDays = attendanceRecords.filter(
      (record) => record.status === 'Leave'
    ).length;
    const halfDays = attendanceRecords.filter(
      (record) => record.status === 'Half-day'
    ).length;
    const absentDays = attendanceRecords.filter(
      (record) => record.status === 'Absent'
    ).length;

    res.status(200).json({
      success: true,
      data: {
        records: attendanceRecords,
        summary: {
          totalDays,
          presentDays,
          leaveDays,
          halfDays,
          absentDays,
          totalWorkingDays: view === 'week' 
            ? 7 
            : view === 'day' 
            ? 1 
            : new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate(),
        },
        dateRange: {
          startDate,
          endDate,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all employees' attendance (for admin/HR view)
export const getAllAttendance = async (req, res, next) => {
  try {
    const { date, week, view } = req.query;

    let startDate, endDate;

    if (view === 'week') {
      // Weekly view
      const targetDate = week ? new Date(week) : new Date();
      startDate = startOfWeek(targetDate, { weekStartsOn: 1 });
      endDate = endOfWeek(targetDate, { weekStartsOn: 1 });
    } else if (view === 'day') {
      // Daily view (default)
      const targetDate = date ? new Date(date) : new Date();
      startDate = startOfDay(targetDate);
      endDate = endOfDay(targetDate);
    } else {
      // Monthly view
      const targetDate = date ? new Date(date) : new Date();
      startDate = startOfMonth(targetDate);
      endDate = endOfMonth(targetDate);
    }

    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ date: -1, checkIn: 1 });

    // Calculate summary statistics
    const totalRecords = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(
      (record) => record.status === 'Present'
    ).length;
    const absentCount = attendanceRecords.filter(
      (record) => record.status === 'Absent'
    ).length;
    const leaveCount = attendanceRecords.filter(
      (record) => record.status === 'Leave'
    ).length;
    const halfDayCount = attendanceRecords.filter(
      (record) => record.status === 'Half-day'
    ).length;

    // Format records for frontend (since employeeId is now a string)
    // The frontend expects employeeId to be an object with name and email
    const formattedRecords = attendanceRecords.map(record => {
      const recordObj = record.toObject();
      return {
        ...recordObj,
        employeeId: {
          _id: record.employeeId,
          employeeId: record.employeeId,
          name: record.employeeId || 'Unknown Employee',
          email: `${record.employeeId.replace(/\s+/g, '').toLowerCase()}@company.com`,
        },
      };
    });

    res.status(200).json({
      success: true,
      data: {
        dateRange: {
          startDate,
          endDate,
        },
        records: formattedRecords,
        summary: {
          totalRecords,
          presentCount,
          absentCount,
          leaveCount,
          halfDayCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by ID
export const getAttendanceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Update attendance (admin only)
export const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, status, remarks } = req.body;

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    if (checkIn) attendance.checkIn = new Date(checkIn);
    if (checkOut) attendance.checkOut = new Date(checkOut);
    if (status) attendance.status = status;
    if (remarks !== undefined) attendance.remarks = remarks;

    await attendance.save();

    res.status(200).json({
      success: true,
      data: attendance,
      message: 'Attendance updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete attendance (admin only)
export const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

