import { Middleware, type ExpressMiddlewareInterface } from "routing-controllers";
import type { Request, Response, NextFunction } from "express";

@Middleware({type: "before"})
export class AllergyMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const { ingredients } = req.body;
    if (ingredients && ingredients.includes("peanuts")) {
      throw new Error("Peanut allergy alert!");
    }
    next();
  }
}