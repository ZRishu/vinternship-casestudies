import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    email: "info@greenfieldcenter.org",
    phone: "555-123-4567",
  });
});

export default router;
