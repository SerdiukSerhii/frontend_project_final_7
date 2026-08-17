import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const page = Number(
      request.nextUrl.searchParams.get('page') ?? 1,
    );

    const limit = Number(
      request.nextUrl.searchParams.get('limit') ?? 20,
    );

    const res = await api.get('/authors', {
      params: {
        page,
        limit,
      },
    });

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