import type { ConversionRates, Currency } from '../types/budget'

interface MonetaryEntry {
  amount: number
  currency: Currency
}

export const convertAmount = (
  amount: number,
  from: Currency,
  to: Currency,
  rates: ConversionRates,
): number => {
  return (amount * rates[from]) / rates[to]
}

export const getTotalInCurrency = (
  entries: ReadonlyArray<MonetaryEntry>,
  targetCurrency: Currency,
  rates: ConversionRates,
): number => {
  return entries.reduce((sum, entry) => {
    return sum + convertAmount(entry.amount, entry.currency, targetCurrency, rates)
  }, 0)
}

export const getNetBalance = (
  incomes: ReadonlyArray<MonetaryEntry>,
  expenses: ReadonlyArray<MonetaryEntry>,
  targetCurrency: Currency,
  rates: ConversionRates,
): number => {
  const incomeTotal = getTotalInCurrency(incomes, targetCurrency, rates)
  const expenseTotal = getTotalInCurrency(expenses, targetCurrency, rates)
  return incomeTotal - expenseTotal
}
