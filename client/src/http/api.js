const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Attendance APIs
export const attendanceAPI = {
  // Clock In
  clockIn: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/attendance/clock-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId }),
    });
    return response.json();
  },

  // Clock Out
  clockOut: async (employeeId) => {
    const response = await fetch(`${API_BASE_URL}/attendance/clock-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId }),
    });
    return response.json();
  },

  // Get my attendance (employee view)
  getMyAttendance: async (employeeId, options = {}) => {
    const params = new URLSearchParams();
    if (options.month) params.append('month', options.month);
    if (options.year) params.append('year', options.year);
    if (options.week) params.append('week', options.week);
    if (options.date) params.append('date', options.date);
    if (options.view) params.append('view', options.view); // 'day', 'week', 'month'
    
    const response = await fetch(
      `${API_BASE_URL}/attendance/my-attendance/${employeeId}?${params.toString()}`
    );
    return response.json();
  },

  // Get all attendance (admin/HR view)
  getAllAttendance: async (options = {}) => {
    const params = new URLSearchParams();
    if (options.date) params.append('date', options.date);
    if (options.week) params.append('week', options.week);
    if (options.view) params.append('view', options.view); // 'day', 'week', 'month'
    
    const response = await fetch(
      `${API_BASE_URL}/attendance/all?${params.toString()}`
    );
    return response.json();
  },

  // Get attendance by ID
  getAttendanceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/attendance/${id}`);
    return response.json();
  },

  // Update attendance (admin only)
  updateAttendance: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Delete attendance (admin only)
  deleteAttendance: async (id) => {
    const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

