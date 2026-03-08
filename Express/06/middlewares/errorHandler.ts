import type { Response, NextFunction } from "express";
import { DischargeRequest } from "../types/type";

// Error-handling middleware in Express MUST have exactly these 4 parameters
export function errorHandler(err: Error, req: DischargeRequest, res: Response, next: NextFunction) {
  console.error("Discharge log:", req.dischargeLog);
  res.status(500).json({ error: err.message || "Internal server error" });
}