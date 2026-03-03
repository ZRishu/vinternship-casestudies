import { z } from "zod";

export const RedeemSchema = z.object({
  customerId: z.string().uuid(),
  points: z.number().int().positive(),
});

export const TransferSchema = z.object({
  fromCustomerId: z.string().uuid(),
  toCustomerId: z.string().uuid(),
  points: z.number().int().positive(),
});
