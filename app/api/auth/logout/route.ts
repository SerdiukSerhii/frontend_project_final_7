import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  const cookieStore = await cookies();

  let response: NextResponse;

  try {
    await api.post('/auth/logout', null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      response = NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    } else {
      response = NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }

  response.cookies.delete('sessionId');
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');

  return response;
}