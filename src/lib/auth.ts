import { NextRequest } from 'next/server';
import crypto from 'crypto';

export function createSessionToken(password: string): string {
  const salt = 'portfolio-salt-2026';
  return crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');
}

export function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_session');
  if (!cookie) return false;

  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (!adminPassword) return false;

  const expectedToken = createSessionToken(adminPassword);
  return cookie.value === expectedToken;
}
