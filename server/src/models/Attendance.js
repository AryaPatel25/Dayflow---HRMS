import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: String, // Using String to match frontend input (e.g., "LLM 003")
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    default: null,
  },
  workHours: {
    type: Number, // in minutes
    default: 0,
  },
  extraHours: {
    type: Number, // in minutes
    default: 0,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Half-day', 'Leave'],
    default: 'Present',
  },
  remarks: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Compound index for efficient queries - allows one record per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Additional indexes for better query performance
attendanceSchema.index({ date: -1 });
attendanceSchema.index({ status: 1 });
attendanceSchema.index({ checkIn: -1 });

// Calculate work hours before saving
attendanceSchema.pre('save', async function() {
  if (this.checkOut && this.checkIn) {
    const diffMs = this.checkOut - this.checkIn;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    this.workHours = diffMinutes;
    
    // Assuming standard work hours is 8 hours (480 minutes)
    const standardWorkMinutes = 480;
    if (diffMinutes > standardWorkMinutes) {
      this.extraHours = diffMinutes - standardWorkMinutes;
    } else {
      this.extraHours = 0;
    }
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;

