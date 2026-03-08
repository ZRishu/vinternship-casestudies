export interface BillingService {
  charge(patient: string, amount: number): Promise<void>;
}