import createHttpError from "http-errors";

const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(createHttpError(403, "Admin access only"));
  }
  next();
};

export default adminOnly;
