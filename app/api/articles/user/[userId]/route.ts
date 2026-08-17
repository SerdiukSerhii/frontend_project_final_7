import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../../api';
import { logErrorResponse } from '../../../_utils/utils';

interface RouteProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteProps,
) {
  try {
    const cookieStore = await cookies();
    const { userId } = await params;

    const page =
      request.nextUrl.searchParams.get('page') ?? '1';

    const perPage =
      request.nextUrl.searchParams.get('perPage') ??
      request.nextUrl.searchParams.get('limit') ??
      '12';

    const res = await api.get(
      `/articles/user/${userId}`,
      {
        params: {
          page,
          perPage,
        },
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