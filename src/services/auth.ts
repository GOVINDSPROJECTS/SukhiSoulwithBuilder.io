import api from './api';
import { useAuthStore } from '../store/authStore';

export const fetchUserInfo = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  const response = await api.get('/user');
  const user = response.data.data;
  useAuthStore.getState().setUser(user);
};
