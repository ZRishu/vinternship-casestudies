// Defining the Order Data Structure & Validation Rules
import { IsDateString, IsString, IsInt, Min, Max } from "class-validator";

export interface Order {
  id: string;
  customerName: string;
  flavor: string;
  quantity: number;
  pickupDate: string;
}

export class OrderValidation {
  @IsDateString()
  pickupDate!: string;

  @IsString()
  flavor!: string;

  @IsInt()
  @Min(1)
  @Max(100)
  quantity!: number;
}
