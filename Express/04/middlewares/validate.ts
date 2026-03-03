import { type RequestHandler } from "express";
import { z } from "zod";

export function validate<T extends z.ZodTypeAny>(schema: T): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      }));

      return res.status(400).json({
        status: "error",
        error: "Validation failed",
        details,
      });
    }
    req.body = result.data;
    next();
  };
}
