// Simple authentication utility
export const AUTH_CREDENTIALS = {
  email: 'rahulrajput81680@gmail.com',
  password: 'Rahul@00'
};

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminAuth') === 'true';
}

export function login(email: string, password: string): boolean {
  if (email === AUTH_CREDENTIALS.email && password === AUTH_CREDENTIALS.password) {
    localStorage.setItem('adminAuth', 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('adminAuth');
}
