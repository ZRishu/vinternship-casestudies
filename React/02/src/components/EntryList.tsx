import type {
  ConversionRates,
  Currency,
  ExpenseEntry,
  IncomeEntry,
} from '../types/budget'
import { convertAmount } from '../utils/currency'

interface EntryListProps<T extends IncomeEntry | ExpenseEntry> {
  title: string
  entries: ReadonlyArray<T>
  selectedCurrency: Currency
  conversionRates: ConversionRates
  emptyMessage: string
}

function EntryList<T extends IncomeEntry | ExpenseEntry>({
  title,
  entries,
  selectedCurrency,
  conversionRates,
  emptyMessage,
}: EntryListProps<T>) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {entries.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul className="entry-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <span className="description">{entry.description}</span>
              <span>
                {convertAmount(
                  entry.amount,
                  entry.currency,
                  selectedCurrency,
                  conversionRates,
                ).toFixed(2)}{' '}
                {selectedCurrency}
              </span>
              <span className="meta">
                {entry.amount.toFixed(2)} {entry.currency}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default EntryList
