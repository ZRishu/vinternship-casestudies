import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json([
    "Art Class - Tuesday 4pm",
    "Music Class - Thursday 3pm"
  ]);
});

export default router;
