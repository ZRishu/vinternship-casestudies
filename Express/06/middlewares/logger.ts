import type { Response, NextFunction } from "express";
import { DischargeRequest } from "../types/type";

export function logDischargeRequest(req: DischargeRequest, res: Response, next: NextFunction) {
  // Initialize the log if it doesn't exist
  req.dischargeLog = req.dischargeLog || [];
  req.dischargeLog.push({ step: "requestReceived", time: new Date().toISOString() });
  next();
}