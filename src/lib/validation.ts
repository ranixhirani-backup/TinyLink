/**
 * Validation utilities for TinyLink API
 */

/**
 * Validates a URL
 * @param url - The URL to validate
 * @returns boolean - true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a short code
 * Must be 6-8 alphanumeric characters
 * @param code - The code to validate
 * @returns boolean - true if valid, false otherwise
 */
export function isValidCode(code: string): boolean {
  const codeRegex = /^[A-Za-z0-9]{6,8}$/;
  return codeRegex.test(code);
}

/**
 * Generates a random code
 * @returns string - A random 6-8 character code
 */
export function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = Math.floor(Math.random() * 3) + 6; // Random between 6-8
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
