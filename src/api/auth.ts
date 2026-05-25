import type { User } from '../types';

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
const jsonHeaders = { 'Content-Type': 'application/json' };

interface AuthPayload {
  token: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: string;
}

async function parseResponse<T>(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as any)?.message || response.statusText || 'Authentication failed');
  }
  return data as T;
}

export async function login({ email, password }: LoginData) {
  const response = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ email, password })
  });

  return parseResponse<AuthPayload>(response);
}

export async function signup({ name, email, password }: SignupData) {
  const response = await fetch(`${apiBase}/api/auth/signup`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ name, email, password })
  });

  return parseResponse<AuthPayload>(response);
}

export async function fetchProfile(token: string) {
  const response = await fetch(`${apiBase}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as any)?.message || response.statusText || 'Could not load profile');
  }

  return data.user as User;
}

export async function updateProfile(token: string, payload: UpdateProfileData) {
  const response = await fetch(`${apiBase}/api/auth/me`, {
    method: 'PUT',
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await parseResponse<{ user: User }>(response);
  return data.user;
}
