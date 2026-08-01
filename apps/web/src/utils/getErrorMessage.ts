/**
 * Extracts a user-facing message from an RTK Query error. The API always
 * responds with `{ message: string }` on failure (see apps/api's
 * error-handler middleware) - this just unwraps that consistently.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: unknown }).data;
    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
      return data.message;
    }
  }
  return fallback;
}
