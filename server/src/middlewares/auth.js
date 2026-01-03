import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw createHttpError(401, "Not authorized. Please log in.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      throw createHttpError(401, "Invalid authentication token");
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      companyId: decoded.companyId,
      mustChangePassword: decoded.mustChangePassword
    };

    next();
  } catch (error) {
    next(error); // handled by globalErrorHandler
  }
};

export default auth;
