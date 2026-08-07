import { FetchNotesResponse, NewNoteBody, Note } from '@/types/note';
import { api } from './api';
import { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>(`/notes`, {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return res.data;
};

export const createNote = async (newNote: NewNoteBody) => {
  const res = await api.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const register = async (registerData: RegisterRequest) => {
  const res = await api.post<User>(`/auth/register`, registerData);
  return res.data;
};

export const login = async (loginData: LoginRequest) => {
  const res = await api.post<User>('/auth/login', loginData);
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
