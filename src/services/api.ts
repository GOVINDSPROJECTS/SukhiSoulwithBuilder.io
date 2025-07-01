import axios from 'axios';
// import { API_BASE_URL } from 'react-native-dotenv';
const api = axios.create({
//   baseURL: API_BASE_URL,
  baseURL:'http://3.6.142.117/api',
  headers: {
    Accept: 'application/json',
  },
});

// Add token to headers dynamically
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
