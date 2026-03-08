import type { Response, NextFunction } from "express";
import { DischargeRequest } from "../types/type";

export function insuranceApprovalCheck(req: DischargeRequest, res: Response, next: NextFunction) {
  if (!req.body.insuranceApproved) {
    res.status(403).json({ error: "Insurance approval required before discharge." });
    return;
  }
  
  req.dischargeLog.push({ step: "insuranceApproved", time: new Date().toISOString() });
  next();
}