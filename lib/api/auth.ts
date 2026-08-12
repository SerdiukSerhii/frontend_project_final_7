import { User } from '@/types/user';
import { api } from './api';
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function register(userData: RegisterRequest): Promise<User> {
  const { data } = await api.post<User>('/auth/register', userData);
  return data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(userData: LoginRequest): Promise<User> {
  const { data } = await api.post<User>('/auth/login', userData);
  return data;
}

export async function refreshSession(): Promise<void> {
  await api.post('/auth/refresh');
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}