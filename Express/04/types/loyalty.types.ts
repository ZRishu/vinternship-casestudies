// Loyalty program interfaces
export interface RedeemRequest {
  customerId: string;
  points: number;
}

export interface ApiResponse<T = any> {
  status: "success" | "error";
  data?: T;
  error?: string;
}
