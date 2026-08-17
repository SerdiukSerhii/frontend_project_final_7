import type { User } from '@/types/user';
import { nextServer } from './api';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function register(
  userData: RegisterRequest
): Promise<User> {
  const { data } = await nextServer.post<User>(
    '/auth/register',
    userData
  );

  return data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(
  userData: LoginRequest
): Promise<User> {
  const { data } = await nextServer.post<User>(
    '/auth/login',
    userData
  );

  return data;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await nextServer.get<User>('/users/me');

  return data;
}

export async function refreshSession(): Promise<void> {
  await nextServer.post('/auth/refresh');
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}