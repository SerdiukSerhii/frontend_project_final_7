import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../../api';

interface RouteProps {
  params: Promise<{
    articleId: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: RouteProps,
) {
  try {
    const cookieStore = await cookies();
    const { articleId } = await params;

    const res = await api.post(
      `/users/saved-articles/${articleId}`,
      null,
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

export async function DELETE(
  request: Request,
  { params }: RouteProps,
) {
  try {
    const cookieStore = await cookies();
    const { articleId } = await params;

    const res = await api.delete(
      `/users/saved-articles/${articleId}`,
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