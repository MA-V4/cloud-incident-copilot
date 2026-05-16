/**
 * API client — wraps all calls to the backend.
 * Base URL is set via NEXT_PUBLIC_API_URL environment variable.
 *
 * TODO Phase 5: expand with full typed methods for each endpoint.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function checkHealth(): Promise<{ status: string; timestamp: string }> {
  return apiFetch('/health');
}
