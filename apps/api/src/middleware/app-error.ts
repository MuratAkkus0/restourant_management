/**
 * Thrown by services/controllers for any expected, user-facing failure.
 * `errorHandler` (below) treats these as safe to show to the client;
 * everything else becomes a generic 500 so internals never leak.
 */
export class AppError extends Error {
  readonly status: number;
  readonly expose = true;
  readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.details = details;
  }

  static badRequest(message: string, details?: unknown) {
    return new AppError(400, message, details);
  }
  static unauthorized(message = "Authentication required.") {
    return new AppError(401, message);
  }
  static forbidden(message = "You do not have permission to do this.") {
    return new AppError(403, message);
  }
  static notFound(message = "Resource not found.") {
    return new AppError(404, message);
  }
  static conflict(message: string) {
    return new AppError(409, message);
  }
}
