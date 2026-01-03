import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout on 401
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  sendVerifyOtp: async () => {
    const response = await api.post("/auth/send-verify-otp");
    return response.data;
  },

  verifyEmail: async (otp) => {
    const response = await api.post("/auth/verify-email", { otp });
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getMe: async () => {
    try {
      const response = await api.get("/users/me");
      console.log("getMe API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("getMe API error:", error);
      // If 401, user is not authenticated
      if (error.response?.status === 401) {
        return { success: false, message: "Not authenticated" };
      }
      throw error;
    }
  },
  updateProfile: async (data) => {
    const response = await api.put("/users/me", data);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch("/users/me", data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.patch("/users/change-password", data);
    return response.data;
  },
};

// Admin API calls
export const adminAPI = {
  getEmployees: async (params = {}) => {
    const response = await api.get("/admin/employees", { params });
    return response.data;
  },

  createEmployee: async (data) => {
    const response = await api.post("/admin/employees", data);
    return response.data;
  },

  updateEmployee: async (employeeId, data) => {
    const response = await api.patch(`/admin/employees/${employeeId}`, data);
    return response.data;
  },

  deactivateEmployee: async (employeeId) => {
    const response = await api.delete(`/admin/employees/${employeeId}`);
    return response.data;
  },
};

// Onboarding API calls
export const onboardingAPI = {
  complete: async (formData) => {
    const response = await api.post("/onboarding", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateAvatar: async (formData) => {
    const response = await api.patch("/onboarding/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default api;
