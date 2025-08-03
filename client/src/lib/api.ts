import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { getAccessToken } = getKindeServerSession();
  const accessToken = await getAccessToken();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  return fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}