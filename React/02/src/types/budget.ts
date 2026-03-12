export type Currency = "USD" | "EUR" | "GBP";

export type PositiveAmount = number & { readonly __brand: "PositiveAmount" };

export const toPositiveAmount = (value: number): PositiveAmount | null => {
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value as PositiveAmount;
};

interface BaseEntry {
  id: string;
  amount: PositiveAmount;
  currency: Currency;
  timestamp: string;
  description: string;
}

export interface IncomeEntry extends BaseEntry {
  kind: "income";
}

export interface ExpenseEntry extends BaseEntry {
  kind: "expense";
}

export interface AuditLogEntry {
  id: string;
  message: string;
  timestamp: string;
}

export type ConversionRates = Readonly<Record<Currency, number>>;

export interface EntryDraft {
  amount: PositiveAmount;
  currency: Currency;
  description: string;
}

export interface BudgetState {
  readonly incomes: ReadonlyArray<IncomeEntry>;
  readonly expenses: ReadonlyArray<ExpenseEntry>;
  readonly auditLog: ReadonlyArray<AuditLogEntry>;
  readonly selectedCurrency: Currency;
  readonly error: string | null;
}

export type BudgetAction =
  | { type: "addIncome"; entry: IncomeEntry }
  | { type: "addExpense"; entry: ExpenseEntry }
  | { type: "setCurrency"; currency: Currency }
  | { type: "clearError" };
