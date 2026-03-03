import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { validate } from "../middlewares/validate";
import { TransferSchema, RedeemSchema } from "../schemas/loyalty.schemas";
import { ApiError, InsufficientPointsError } from "../errors/api.errors";
import { db } from "../db/db";

const router = Router();

const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    throw new ApiError(401, "Missing Authorization header");
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Invalid Authorization header");
  }

  (req as Request & { user?: { id: string } }).user = { id: token };
  next();
};

router.post(
  "/redeem",
  validate(RedeemSchema),
  authenticate,
  (req: Request, res: Response) => {
    const { customerId, points } = req.body;

    const customer = db.loyaltyMembers.find((m) => m.customerId === customerId);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    if (customer.points < points) {
      throw new InsufficientPointsError();
    }

    if (db.inventory.totalItems <= 0) {
      throw new ApiError(400, "Out of inventory");
    }

    // Process redemption
    customer.points -= points;
    db.inventory.totalItems -= 1;

    return res.status(200).json({
      status: "success",
      data: {
        remainingPoints: customer.points,
        redeemedItem: "Generic Item",
      },
    });
  },
);

router.post(
  "/transfer",
  validate(TransferSchema),
  authenticate,
  (req: Request, res: Response) => {
    const { fromCustomerId, toCustomerId, points } = req.body;

    if (fromCustomerId === toCustomerId) {
      throw new ApiError(400, "Cannot transfer to the same account");
    }

    const sender = db.loyaltyMembers.find(
      (m) => m.customerId === fromCustomerId,
    );

    const receiver = db.loyaltyMembers.find(
      (m) => m.customerId === toCustomerId,
    );

    if (!sender) {
      throw new ApiError(404, "Sender not found");
    }

    if (!receiver) {
      throw new ApiError(404, "Recipient not found");
    }

    if (sender.points < points) {
      throw new InsufficientPointsError();
    }

    // Transfer
    sender.points -= points;
    receiver.points += points;

    return res.json({
      status: "success",
      data: {
        fromCustomerId,
        toCustomerId,
        transferredPoints: points,
        remainingPoints: sender.points,
      },
    });
  },
);

export default router;
