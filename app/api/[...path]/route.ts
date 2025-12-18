import { NextRequest, NextResponse } from 'next/server';

import { cache } from '@/lib/cache';
import { EXTERNAL_API_BASE_URL } from '@/lib/api';

const getCacheKey = (path: string[], searchParams: URLSearchParams): string => {
  const queryString = searchParams.toString();
  const pathString = path.join('/');

  return queryString ? `${pathString}?${queryString}` : pathString;
};

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  try {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams;
    
    const cacheKey = getCacheKey(path, searchParams);
    
    const cachedData = cache.get<unknown>(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'X-Cache': 'HIT',
        },
      });
    }

    const pathString = path.join('/');
    const queryString = searchParams.toString();
    const externalUrl = `${EXTERNAL_API_BASE_URL}/${pathString}${queryString ? `?${queryString}` : ''}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const auth = request.headers.get('authorization');
    const cookie = request.headers.get('cookie');
    
    if (auth) headers.authorization = auth;
    if (cookie) headers.cookie = cookie;
    
    const response = await fetch(externalUrl, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return NextResponse.json(
        {
          error: 'External API error',
          status: response.status,
          message: errorText,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    cache.set(cacheKey, data);

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return NextResponse.json(
          {
            error: 'Request timeout',
            message: 'The external API did not respond in time',
          },
          { status: 504 },
        );
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        return NextResponse.json(
          {
            error: 'Network error',
            message: 'Failed to connect to external API',
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
};
