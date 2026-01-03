import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import userModel from "../models/userSchema.js";
import companyModel from "../models/companySchema.js";
import transporter from "../config/nodemailer.js";
import { generateLoginId } from "../utils/loginIdGenerator.js";

export const createEmployee = async (req, res, next) => {
  try {
    const admin = req.user;
    const { name, email, phone, yearOfJoining } = req.body;

    // Validate required fields
    if (!name || !email || !yearOfJoining) {
      throw createHttpError(
        400,
        "Missing required fields: name, email, and yearOfJoining are required"
      );
    }

    // Validate admin user exists
    if (!admin || !admin.id || !admin.companyId) {
      throw createHttpError(401, "Invalid admin authentication");
    }

    // Fetch company information
    const company = await companyModel.findById(admin.companyId);
    if (!company) {
      throw createHttpError(404, "Company not found");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "Employee with this email already exists");
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Parse name for login ID generation
    const [firstName, lastName = ""] = name.trim().split(/\s+/);

    // Generate login ID
    const loginId = await generateLoginId({
      companyName: company.name,
      firstName,
      lastName,
      yearOfJoining,
      companyId: admin.companyId,
    });

    // Create employee
    const employee = await userModel.create({
      companyId: admin.companyId,
      name,
      email,
      phone,
      password: hashedPassword,
      role: "EMPLOYEE",
      mustChangePassword: true,
      yearOfJoining,
      loginId,
    });

    // Send email with credentials
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your DayFlow Employee Account",
      text: `Welcome to ${company.name}!\n\nYour account has been created.\nLogin ID: ${loginId}\nTemporary Password: ${tempPassword}\n\nPlease log in and change your password.`,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        loginId: employee.loginId,
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const admin = req.user;
    const { employeeId } = req.params;
    const { name, phone, isActive } = req.body;

    // Validate admin user
    if (!admin || !admin.id || !admin.companyId) {
      throw createHttpError(401, "Invalid admin authentication");
    }

    // Validate employeeId
    if (!employeeId) {
      throw createHttpError(400, "Employee ID is required");
    }

    // Find employee
    const employee = await userModel.findOne({
      _id: employeeId,
      companyId: admin.companyId,
      role: "EMPLOYEE",
    });

    if (!employee) {
      throw createHttpError(404, "Employee not found");
    }

    // Update fields if provided
    if (name && name.trim()) employee.name = name.trim();
    if (phone !== undefined) employee.phone = phone;
    if (typeof isActive === "boolean") employee.isActive = isActive;

    await employee.save();

    res.json({
      success: true,
      message: "Employee updated successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        isActive: employee.isActive,
      },
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    next(error);
  }
};

export const deactivateEmployee = async (req, res, next) => {
  try {
    const admin = req.user;
    const { employeeId } = req.params;

    // Validate admin user
    if (!admin || !admin.id || !admin.companyId) {
      throw createHttpError(401, "Invalid admin authentication");
    }

    // Validate employeeId
    if (!employeeId) {
      throw createHttpError(400, "Employee ID is required");
    }

    // Find employee
    const employee = await userModel.findOne({
      _id: employeeId,
      companyId: admin.companyId,
      role: "EMPLOYEE",
    });

    if (!employee) {
      throw createHttpError(404, "Employee not found");
    }

    // Check if already deactivated
    if (!employee.isActive) {
      return res.json({
        success: true,
        message: "Employee is already deactivated",
      });
    }

    // Deactivate employee
    employee.isActive = false;
    await employee.save();

    res.json({
      success: true,
      message: "Employee deactivated successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        isActive: employee.isActive,
      },
    });
  } catch (error) {
    console.error("Error deactivating employee:", error);
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const admin = req.user;

    // Validate admin user
    if (!admin || !admin.id || !admin.companyId) {
      throw createHttpError(401, "Invalid admin authentication");
    }

    // Get query parameters for filtering
    const { isActive, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {
      companyId: admin.companyId,
      role: "EMPLOYEE",
    };

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    // Get employees with pagination
    const employees = await userModel
      .find(filter)
      .select(
        "-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalEmployees = await userModel.countDocuments(filter);

    res.json({
      success: true,
      employees,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalEmployees / limit),
        totalEmployees,
        hasNext: skip + employees.length < totalEmployees,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error getting employees:", error);
    next(error);
  }
};

export const reactivateEmployee = async (req, res, next) => {
  try {
    const admin = req.user;
    const { employeeId } = req.params;

    // Validate admin user
    if (!admin || !admin.id || !admin.companyId) {
      throw createHttpError(401, "Invalid admin authentication");
    }

    // Validate employeeId
    if (!employeeId) {
      throw createHttpError(400, "Employee ID is required");
    }

    // Find employee
    const employee = await userModel.findOne({
      _id: employeeId,
      companyId: admin.companyId,
      role: "EMPLOYEE",
    });

    if (!employee) {
      throw createHttpError(404, "Employee not found");
    }

    // Check if already active
    if (employee.isActive) {
      return res.json({
        success: true,
        message: "Employee is already active",
      });
    }

    // Reactivate employee
    employee.isActive = true;
    await employee.save();

    res.json({
      success: true,
      message: "Employee reactivated successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        isActive: employee.isActive,
      },
    });
  } catch (error) {
    console.error("Error reactivating employee:", error);
    next(error);
  }
};
