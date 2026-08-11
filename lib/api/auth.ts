import { User } from '@/types/user';
import { api } from './api';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export async function register(user: RegisterRequest) {
  const { data } = await api.post<User>('/auth/register', user);
  return data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(userData: LoginRequest): Promise<User> {
  const { data } = await api.post<User>(`/auth/login`, userData);
  return data;
}
