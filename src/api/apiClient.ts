import { BASE_URL } from '@/constants/urls';

interface FetchOptions extends RequestInit {
  queryParams?: Record<string, string>;
}

export async function apiFetch<T>(
  endpoint: string,
  { queryParams, headers, ...options }: FetchOptions = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  if (queryParams) {
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key]),
    );
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
