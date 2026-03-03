// Define custom errors for clarity
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any,
  ) {
    super(message);
  }
}

export class InsufficientPointsError extends ApiError {
  constructor() {
    super(400, "Insufficient points");
  }
}
