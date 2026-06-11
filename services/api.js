// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const API_BASE_URL = 'http://192.168.1.11:8080/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Add token to requests
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const customerAPI = {
//   register: (data) => api.post('/customer/register', data),
//   login: (data) => api.post('/customer/login', data),
//   createLoadRequest: (customerId, formData) =>
//     api.post(`/customer/${customerId}/load-request`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   getLoadRequests: (customerId) => api.get(`/customer/${customerId}/load-requests`),

//   // ✅ NEW: Trip details
//   getTripDetails: (loadRequestId) =>
//   api.get(`/customer/load-request/${loadRequestId}/trip`),

// makePayment: (tripId, paymentData) =>
//     api.post(`/trip/${tripId}/payment`, paymentData),

//   getProfile: (customerId) => api.get(`/customer/customer/${customerId}`),
// };

// export default api;


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = "https://rightpolamright.com/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Token attach
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const customerAPI = {
  register: (data) => api.post('/customer/register', data),

  login: (data) => api.post('/customer/login', data),

  createLoadRequest: (customerId, formData) =>
    api.post(`/customer/${customerId}/load-request`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getLoadRequests: (customerId) =>
    api.get(`/customer/${customerId}/load-requests`),

  // ✅ Trip details
  getTripDetails: (loadRequestId) =>
    api.get(`/customer/load-request/${loadRequestId}/trip`),

  // ✅ Payment
  makePayment: (tripId, paymentData) =>
    api.post(`/trip/${tripId}/payment`, paymentData),

  // ✅ Profile
  getProfile: (customerId) =>
    api.get(`/customer/customer/${customerId}`),

  // 🔥 ✅ DELETE LOAD REQUEST
  deleteLoadRequest: (id) =>
    api.delete(`/customer/load-request/${id}`),
};
 export default api;
