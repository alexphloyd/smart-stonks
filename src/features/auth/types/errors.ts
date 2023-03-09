export interface TAuthError extends Error {
  type: 'login' | 'signup';
}
