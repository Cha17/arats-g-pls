import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const { getAccessToken } = getKindeServerSession();
  const accessToken = await getAccessToken();

  return fetch(`http://localhost:8080${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}