import { NextRequest, NextResponse } from 'next/server';
import { fetchExternal } from '@/lib/api';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  try {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams;
    const pathString = path.join('/');
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${pathString}?${queryString}` : pathString;

    const data = await fetchExternal(fullPath);

    return NextResponse.json(data, {
      headers: {
        'X-Cache-Status': 'Shared',
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      {
        error: 'External API error',
        message: errorMessage,
      },
      { status: 500 },
    );
  }
};
