import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const fetchUserInfo = async () => {
  const token = useAuthStore.getState().token;

  if (!token) return;

  const response = await axios.get('http://3.6.142.117/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const user = response.data.data; // Adjust based on backend response
  useAuthStore.getState().setUser(user);
};
