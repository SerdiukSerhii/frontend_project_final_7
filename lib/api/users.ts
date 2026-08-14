import { api } from './api';

export interface UpdateAvatarResponse {
  url: string;
}

export async function updateUserAvatar(file: File): Promise<UpdateAvatarResponse> {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.patch<UpdateAvatarResponse>('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}
export async function getUserById(userId: string) {
  const { data } = await api.get(`/users/${userId}`);
  return data;
}