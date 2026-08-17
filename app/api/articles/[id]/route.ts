import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.get(
      `/articles/${id}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
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
        }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Props,
) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const formData = await request.formData();

    const res = await api.patch(
      `/articles/${id}`,
      formData,
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