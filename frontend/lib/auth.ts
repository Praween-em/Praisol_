import { User } from '@/types';

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

export function saveUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
}

export function logout() {
  clearTokens();
  window.location.href = '/login';
}
