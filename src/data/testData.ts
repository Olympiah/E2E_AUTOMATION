export const credentials = {
  valid: {
    // `||` (not `??`) so an unset GitHub Actions secret — which resolves to ""
    // rather than undefined — still falls back to the demo default.
    username: process.env.LOGIN_USERNAME || 'Admin',
    password: process.env.LOGIN_PASSWORD || 'admin123',
  },
  invalid: {
    username: 'InvalidUser',
    password: 'wrongPassword123',
  },
};

export function uniqueName(prefix: string): string {
  return `${prefix}${Date.now()}`;
}
