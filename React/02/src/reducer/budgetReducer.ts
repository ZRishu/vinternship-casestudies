import type {
  AuditLogEntry,
  BudgetAction,
  BudgetState,
  ConversionRates,
} from '../types/budget'
import { getNetBalance } from '../utils/currency'

export const initialBudgetState: BudgetState = {
  incomes: [],
  expenses: [],
  auditLog: [],
  selectedCurrency: 'USD',
  error: null,
}

const buildLogEntry = (message: string): AuditLogEntry => {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    timestamp: new Date().toISOString(),
  }
}

export const createBudgetReducer =
  (rates: ConversionRates) =>
  (state: BudgetState, action: BudgetAction): BudgetState => {
    switch (action.type) {
      case 'addIncome': {
        return {
          ...state,
          incomes: [...state.incomes, action.entry],
          error: null,
          auditLog: [
            ...state.auditLog,
            buildLogEntry(
              `Income +${action.entry.amount.toFixed(2)} ${action.entry.currency}`,
            ),
          ],
        }
      }

      case 'addExpense': {
        const availableInExpenseCurrency = getNetBalance(
          state.incomes,
          state.expenses,
          action.entry.currency,
          rates,
        )

        if (action.entry.amount > availableInExpenseCurrency + 1e-9) {
          return {
            ...state,
            error: `Insufficient balance. Available ${availableInExpenseCurrency.toFixed(2)} ${action.entry.currency}.`,
          }
        }

        return {
          ...state,
          expenses: [...state.expenses, action.entry],
          error: null,
          auditLog: [
            ...state.auditLog,
            buildLogEntry(
              `Expense -${action.entry.amount.toFixed(2)} ${action.entry.currency}`,
            ),
          ],
        }
      }

      case 'setCurrency': {
        return {
          ...state,
          selectedCurrency: action.currency,
        }
      }

      case 'clearError': {
        return {
          ...state,
          error: null,
        }
      }

      default: {
        return state
      }
    }
  }
