# 🌿 DayFlow — Human Resource Management System (HRMS)

🚀 **Odoo × GCET Hackathon 26**  
📍 Virtual Round  
📅 **03 January 2026 (Saturday)**  

---

## 📌 About the Project

**DayFlow** is a role-based **Human Resource Management System (HRMS)** designed to simplify employee onboarding and profile management within an organization.

The system ensures secure access, structured onboarding, and clear separation of responsibilities between **Admins** and **Employees**.

---

## 🎯 Problem Statement

Organizations often face challenges in managing employee data, onboarding processes, and access control using fragmented or manual systems.  
DayFlow addresses this by providing a **centralized, secure, and scalable HRMS platform**.

---

## 👥 User Roles

### 🛡 Admin / HR
- Register and manage employees
- Auto-generate employee login credentials
- Manage employee profiles
- Control onboarding flow

### 👤 Employee
- Login using **Login ID or Email**
- Complete onboarding after first login
- Manage personal profile details
- Upload profile avatar

---

## 🔐 Authentication & Security

- Secure login with **JWT (HTTP-only cookies)**
- Role-based access control
- Auto-generated Login ID & temporary password
- OTP-based email verification & password reset
- Mandatory password change on first login

---

## 🧭 Core Features

- Organization registration with company logo
- Admin-controlled employee creation
- Automated Login ID generation
- Employee onboarding flow
- Profile image upload using Cloudinary
- Email notifications for account actions

---

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

**Services**
- Cloudinary (Image uploads)
- Nodemailer (Emails & OTPs)
- Multer (File handling)

---
