import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import cors from 'cors';
import { config } from './config/config.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();

app.use(cors({
    origin: config.frontendDomain || '*',
    credentials: true,
}));

app.use(express.json());

// Routes :-

// Http Methods :- GET, POST, PUT, PATCH, DELETE

app.get('/', (req, res) => {
    res.json({message: "Welcome to DayFlow apis"});
});

// Attendance routes
app.use('/api/attendance', attendanceRoutes);

// Global error handler
app.use(globalErrorHandler);

export default app;