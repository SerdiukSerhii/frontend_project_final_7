import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';
import { isAxiosError } from 'axios';

import { api } from '../../api';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.post(
      '/auth/refresh',
      null,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const response = NextResponse.json(
      apiRes.data ?? { success: true },
      { status: apiRes.status }
    );

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie)
        ? setCookie
        : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        if (parsed.value) {
          response.cookies.set(
            parsed.name,
            parsed.value,
            parsed
          );
        }
      }
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}