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

/**
 * Data-driven login edge cases. `expected` was determined by manually observing
 * real site behavior (not assumed) — OrangeHRM does NOT trim whitespace before
 * comparing credentials, so padded-but-otherwise-valid creds are rejected as
 * "invalid", not silently trimmed and accepted; whitespace-only fields are instead
 * caught by client-side required-field validation before any request is sent.
 */
export const loginEdgeCases: {
  name: string;
  username: string;
  password: string;
  expected: 'invalid-credentials' | 'required-validation';
}[] = [
  {
    name: 'SQL-injection-style input',
    username: "' OR '1'='1",
    password: "' OR '1'='1",
    expected: 'invalid-credentials',
  },
  {
    name: 'whitespace-padded valid credentials',
    username: `  ${credentials.valid.username}  `,
    password: `  ${credentials.valid.password}  `,
    expected: 'invalid-credentials',
  },
  {
    name: 'very long username (300 chars)',
    username: 'A'.repeat(300),
    password: credentials.valid.password,
    expected: 'invalid-credentials',
  },
  {
    name: 'whitespace-only username and password',
    username: '   ',
    password: '   ',
    expected: 'required-validation',
  },
];

/**
 * Timestamp alone isn't enough once tests run under multiple parallel workers —
 * two workers can generate the same millisecond, and a search-by-prefix in one
 * worker could otherwise pick up a record another worker just created. Fold in
 * the worker index (test.info().parallelIndex) so generated data is provably
 * isolated per worker, not just probably-unique by timestamp.
 */
export function uniqueName(prefix: string, workerIndex = 0): string {
  return `${prefix}W${workerIndex}${Date.now()}`;
}
