import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { applicationValidation } from "./validators/application.validator";
import { artApplicationValidation } from "./validators/artApplication.validator";

const app = express();
app.use(express.json());

app.post("/apply", applicationValidation, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  res.json({ status: "Application received!" });
});

app.post("/apply/art", artApplicationValidation, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  res.json({ status: "Art application received!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`BrightFuture University admissions system running on port ${PORT}`);
});