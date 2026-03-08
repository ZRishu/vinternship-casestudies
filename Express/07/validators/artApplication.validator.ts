import { body } from "express-validator";
import { applicationValidation } from "./application.validator";

export const artApplicationValidation = [
  // Inherit all standard application rules
  ...applicationValidation,
  
  // Add the specific portfolio requirement for Art applicants
  body("portfolioLink")
    .isURL()
    .withMessage("A valid portfolio link is required for art applicants.")
];