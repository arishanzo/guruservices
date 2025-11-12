// src/lib/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // penting untuk Sanctum
    "Accept": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});


// Auto-detect content type
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  config.withCredentials = true; 
  return config;
});

// Handle response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      // Network error (server tidak bisa dijangkau)
      error.message = 'Network Error: Server tidak dapat dijangkau';
    } else if (error.response.status === 500) {
      error.message = 'Server Error: Terjadi kesalahan pada server';
    } else if (error.response.status === 404) {
      error.message = 'Not Found: Endpoint tidak ditemukan';
    } else if (error.response.status === 401) {
      error.message = 'Unauthorized: Sesi telah berakhir';
      localStorage.removeItem('auth_token');
    }
    
    return Promise.reject(error);
  }
);


// Service Communication Helper
export const serviceClient = {
  // Panggil user service dari guru frontend
  getUserProfile: (userId) => {
    return axiosClient.get(`/api/services/user/${userId}`, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY
      }
    });
  },
  

  getBookingKelasUser: (idProfilGuru) => {
    return axiosClient.get(`/api/services/booking/${idProfilGuru}`, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
      }
    });
  },

    putBookingKelasUser: (idBookingPrivate, statusBooking) => {
    return axiosClient.put(`/api/services/bookingupdate/${idBookingPrivate}`, statusBooking,{
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
          "Accept": "application/json",
      }
    });
  },

  putUpdateTglBooking: (idtglbooking, tanggalBooking) => {
    return axiosClient.put(`/api/services/tglbooking/${idtglbooking}`, tanggalBooking,{
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
          "Accept": "application/json",
      }
    });
  },
  // Ambil data gabungan dari kedua service
  getCrossServiceData: (userId, guruId) => {
    return axiosClient.post('/services/cross-data', {
      user_id: userId,
      guru_id: guruId
    }, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
      }
    });
  }
};

export default axiosClient;
