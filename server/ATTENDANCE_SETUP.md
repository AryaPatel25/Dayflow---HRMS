# Attendance Collection Setup

## Overview
The Attendance collection has been set up in MongoDB to track employee attendance records.

## Collection Details

### Collection Name
- **MongoDB Collection**: `attendances` (automatically pluralized by Mongoose)

### Schema Structure
The Attendance model includes the following fields:

- **employeeId** (String, required, indexed)
  - Employee identifier (e.g., "LLM 003")
  - Used to track which employee the record belongs to

- **date** (Date, required, indexed)
  - The date of the attendance record
  - Stored as start of day for consistency

- **checkIn** (Date, required)
  - Timestamp when employee clocked in

- **checkOut** (Date, optional)
  - Timestamp when employee clocked out
  - Defaults to null if not set

- **workHours** (Number, default: 0)
  - Total work hours in minutes
  - Automatically calculated when checkOut is set

- **extraHours** (Number, default: 0)
  - Overtime hours in minutes
  - Calculated if workHours exceeds 8 hours (480 minutes)

- **status** (String, enum, default: 'Present')
  - Possible values: 'Present', 'Absent', 'Half-day', 'Leave'

- **remarks** (String, optional)
  - Additional notes or comments

- **timestamps** (automatic)
  - `createdAt`: When the record was created
  - `updatedAt`: When the record was last updated

## Indexes

The collection has the following indexes for optimal query performance:

1. **employeeId** - Single field index
2. **date** - Single field index (descending)
3. **status** - Single field index
4. **checkIn** - Single field index (descending)
5. **employeeId + date** - Compound unique index
   - Ensures only one attendance record per employee per day

## Automatic Collection Creation

**No manual setup required!** The collection will be automatically created when:
- An employee clocks in for the first time
- An attendance record is created via the API
- The server starts and Mongoose connects to the database

## API Endpoints

### Employee Endpoints
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance/my-attendance/:employeeId` - Get own attendance

### Admin/HR Endpoints
- `GET /api/attendance/all` - Get all employees' attendance
- `GET /api/attendance/:id` - Get specific attendance record
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record

## Usage Example

### Clock In
```javascript
POST /api/attendance/clock-in
Body: { "employeeId": "LLM 003" }
```

### Clock Out
```javascript
POST /api/attendance/clock-out
Body: { "employeeId": "LLM 003" }
```

### Get Attendance Records
```javascript
GET /api/attendance/my-attendance/LLM 003?view=month&month=12&year=2024
```

## Notes

- The collection uses MongoDB's automatic document structure
- Work hours are automatically calculated when an employee clocks out
- The unique index on (employeeId, date) prevents duplicate records for the same day
- All timestamps are stored in UTC and converted as needed

## Verification

To verify the collection was created:
1. Connect to MongoDB using MongoDB Compass or CLI
2. Look for the `attendances` collection in your database
3. Check that indexes are created (should see 5 indexes)

## Troubleshooting

If the collection doesn't appear:
1. Ensure MongoDB connection is working
2. Try clocking in an employee through the frontend
3. Check server logs for any connection errors
4. Verify the database URL in your `.env` file

