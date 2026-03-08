import { type Request } from "express";

// The shape of a single log entry
export interface LogEntry {
  step: string;
  time: string;
}

// Extending the standard Express Request to include our hospital's data
export interface DischargeRequest extends Request {
  dischargeLog: LogEntry[];
  body: {
    patientName?: string;
    doctorSigned?: boolean;
    pharmacyChecked?: boolean;
    followupScheduled?: boolean;
    insuranceApproved?: boolean;
  };
}