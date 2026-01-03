import userModel from "../models/userSchema.js";

/**
 * Get company initials from name
 * "Odoo India" -> "OI"
 * "Tech Soft Pvt Ltd" -> "TSPL"
 */
const getCompanyInitials = (companyName) => {
  return companyName
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join("");
};

/**
 * Get first 2 letters of name (padded if needed)
 * "Jo" -> "JO"
 * "A"  -> "AX"
 */
const getTwoLetters = (value) => {
  return value
    .substring(0, 2)
    .toUpperCase()
    .padEnd(2, "X");
};

/**
 * Get next serial number (company + year scoped)
 */
const getNextSerial = async (companyId, year) => {
  const lastUser = await userModel
    .findOne({ companyId, yearOfJoining: year })
    .sort({ createdAt: -1 })
    .select("loginId");

  if (!lastUser) return "0001";

  const lastSerial = lastUser.loginId.slice(-4);
  return String(Number(lastSerial) + 1).padStart(4, "0");
};

/**
 * FINAL Login ID Generator
 */
export const generateLoginId = async ({
  companyName,
  firstName,
  lastName,
  yearOfJoining,
  companyId
}) => {
  const companyCode = getCompanyInitials(companyName);
  const firstNameCode = getTwoLetters(firstName);
  const lastNameCode = getTwoLetters(lastName);
  const serial = await getNextSerial(companyId, yearOfJoining);

  return `${companyCode}${firstNameCode}${lastNameCode}${yearOfJoining}${serial}`;
};
