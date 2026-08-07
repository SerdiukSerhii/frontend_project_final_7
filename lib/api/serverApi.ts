import { FetchNotesResponse, Note } from '@/types/note';
import { api } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const res = await api.get<FetchNotesResponse>(`/notes`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
