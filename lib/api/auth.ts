import { api } from './api';
import { User } from '@/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(userData: LoginRequest): Promise<User> {
  const { data } = await api.post<User>(`/auth/login`, userData);
  return data;
}

export async function logout(): Promise<void> {
  await api.post(`/auth/logout`);
}