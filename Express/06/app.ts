import express, { RequestHandler } from "express";
import { logDischargeRequest } from "./middlewares/logger";
import { doctorSignoffCheck, pharmacyReview, followupCheck } from "./middlewares/dischargeChecks";
import { insuranceApprovalCheck } from "./middlewares/insuranceCheck";
import { errorHandler } from "./middlewares/errorHandler";
import { DischargeRequest } from "./types/type";

const app = express();
app.use(express.json());

// Global logging middleware
app.use(logDischargeRequest as RequestHandler);

// The Discharge Relay Race Route
app.post(
  "/discharge",
  doctorSignoffCheck as RequestHandler,
  pharmacyReview as RequestHandler,
  insuranceApprovalCheck as RequestHandler,
  followupCheck as RequestHandler,
  (req, res) => {
    // Cast req to DischargeRequest for the final handler
    const dischargeReq = req as DischargeRequest;
    
    dischargeReq.dischargeLog.push({ step: "dischargeComplete", time: new Date().toISOString() });
    
    res.json({
      status: "Discharge complete",
      patient: dischargeReq.body.patientName,
      log: dischargeReq.dischargeLog,
    });
  }
);

app.use(errorHandler as express.ErrorRequestHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hospital system running on port ${PORT}`);
});