import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const events = [
    "Yoga Class - Monday 7pm",
    "Gardening Workshop - Wednesday 5pm",
    "Book Club - Friday 6pm",
  ];
  res.json(events);
});

export default router;
