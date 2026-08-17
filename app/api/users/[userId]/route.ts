import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

interface RouteProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteProps,
) {
  try {
    const cookieStore = await cookies();
    const { userId } = await params;

    const res = await api.get(
      `/users/${userId}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}