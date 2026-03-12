import type {
  ConversionRates,
  Currency,
  ExpenseEntry,
  IncomeEntry,
} from '../types/budget'
import { getNetBalance, getTotalInCurrency } from '../utils/currency'

interface BalanceSummaryProps {
  incomes: ReadonlyArray<IncomeEntry>
  expenses: ReadonlyArray<ExpenseEntry>
  selectedCurrency: Currency
  conversionRates: ConversionRates
}

const BalanceSummary = ({
  incomes,
  expenses,
  selectedCurrency,
  conversionRates,
}: BalanceSummaryProps) => {
  const totalIncome = getTotalInCurrency(incomes, selectedCurrency, conversionRates)
  const totalExpense = getTotalInCurrency(
    expenses,
    selectedCurrency,
    conversionRates,
  )
  const netBalance = getNetBalance(
    incomes,
    expenses,
    selectedCurrency,
    conversionRates,
  )

  return (
    <section className="panel summary">
      <h2>Balance Summary</h2>
      <p>
        Income: <strong>{totalIncome.toFixed(2)}</strong> {selectedCurrency}
      </p>
      <p>
        Expense: <strong>{totalExpense.toFixed(2)}</strong> {selectedCurrency}
      </p>
      <p className={netBalance >= 0 ? 'positive' : 'negative'}>
        Net: <strong>{netBalance.toFixed(2)}</strong> {selectedCurrency}
      </p>
    </section>
  )
}

export default BalanceSummary
