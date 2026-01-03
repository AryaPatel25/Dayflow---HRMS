import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  department: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

// Index for faster queries
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ email: 1 });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

