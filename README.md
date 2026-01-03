# Dayflow - Human Resource Management System

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation & Setup

#### 1. Install Client Dependencies
```bash
cd client
npm install
```

#### 2. Install Server Dependencies
```bash
cd server
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
copy .env.example .env
```

Edit the `.env` file and add your MongoDB connection string:
```
PORT=3000
NODE_ENV=development
MONGO_CONNECTION_STRING=mongodb://localhost:27017/dayflow-hrms
```

**For MongoDB Atlas:**
```
MONGO_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/dayflow-hrms
```

#### 4. Run the Application

**Terminal 1 - Start the Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:3000`

**Terminal 2 - Start the Client:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

### 📱 Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

### 🎯 Attendance Page

The attendance page is available at:
- http://localhost:5173/attendance

### 📝 API Endpoints

#### Attendance APIs
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance/my-attendance/:employeeId` - Get employee attendance
- `GET /api/attendance/all?date=YYYY-MM-DD` - Get all employees attendance (Admin)
- `GET /api/attendance/:id` - Get attendance by ID
- `PUT /api/attendance/:id` - Update attendance (Admin)
- `DELETE /api/attendance/:id` - Delete attendance (Admin)

### 🛠️ Troubleshooting

1. **MongoDB Connection Error:**
   - Make sure MongoDB is running locally, or
   - Check your MongoDB Atlas connection string

2. **Port Already in Use:**
   - Change the PORT in server/.env file
   - Update VITE_API_BASE_URL in client if needed

3. **CORS Errors:**
   - The server has CORS enabled for all origins in development
   - Update the CORS configuration in `server/src/app.js` for production

### 📦 Project Structure

```
Dayflow---HRMS-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── http/          # API functions
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   └── config/        # Configuration files
│   └── package.json
└── README.md
```

### 🎨 Features

- ✅ Dark mode UI with shadcn/ui styling
- ✅ Clock In/Clock Out functionality
- ✅ Attendance records with search and pagination
- ✅ Employee and Admin views
- ✅ Real-time clock display
- ✅ Responsive design
