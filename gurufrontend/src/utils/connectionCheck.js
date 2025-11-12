// src/utils/connectionCheck.js
import axiosClient from '../lib/axios';

export const checkBackendConnection = async () => {
  try {
    const response = await axiosClient.get('/api/check-session', {
      timeout: 3000
    });
    return { connected: true, data: response.data };
  } catch (error) {
    console.warn('Backend connection failed:', error.message);
    return { 
      connected: false, 
      error: error.message,
      offline: true 
    };
  }
};

export const isNetworkError = (error) => {
  return !error.response || 
         error.code === 'ECONNREFUSED' || 
         error.code === 'NETWORK_ERROR' ||
         error.message.includes('Network Error');
};