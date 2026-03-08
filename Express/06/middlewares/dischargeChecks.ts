import { Response, NextFunction } from "express";
import { DischargeRequest } from "../types/type";

export function doctorSignoffCheck(req: DischargeRequest, res: Response, next: NextFunction) {
  if (!req.body.doctorSigned) {
    res.status(400).json({ error: "Doctor sign-off required before discharge." });
    return;
  }
  req.dischargeLog.push({ step: "doctorSignoff", time: new Date().toISOString() });
  next();
}

export function pharmacyReview(req: DischargeRequest, res: Response, next: NextFunction) {
  if (!req.body.pharmacyChecked) {
    res.status(400).json({ error: "Pharmacy review required before discharge." });
    return;
  }
  req.dischargeLog.push({ step: "pharmacyReview", time: new Date().toISOString() });
  next();
}

export function followupCheck(req: DischargeRequest, res: Response, next: NextFunction) {
  if (!req.body.followupScheduled) {
    res.status(400).json({ error: "Follow-up appointment must be scheduled." });
    return;
  }
  req.dischargeLog.push({ step: "followupCheck", time: new Date().toISOString() });
  next();
}