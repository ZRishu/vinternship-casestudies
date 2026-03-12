import { useState } from 'react'
import type { Currency, EntryDraft } from '../types/budget'
import { toPositiveAmount } from '../types/budget'

interface EntryFormProps {
  kind: 'income' | 'expense'
  currencies: ReadonlyArray<Currency>
  onSubmit: (entry: EntryDraft) => void
}

interface EntryFormState {
  amount: string
  currency: Currency
  description: string
  error: string | null
}

const EntryForm = ({ kind, currencies, onSubmit }: EntryFormProps) => {
  const [form, setForm] = useState<EntryFormState>({
    amount: '',
    currency: currencies[0] ?? 'USD',
    description: '',
    error: null,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsed = Number.parseFloat(form.amount)
    const positiveAmount = toPositiveAmount(parsed)

    if (!positiveAmount) {
      setForm((current) => ({ ...current, error: 'Enter a valid amount > 0.' }))
      return
    }

    onSubmit({
      amount: positiveAmount,
      currency: form.currency,
      description: form.description.trim() || `${kind} entry`,
    })

    setForm((current) => ({
      ...current,
      amount: '',
      description: '',
      error: null,
    }))
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>{kind === 'income' ? 'Add Income' : 'Add Expense'}</h2>

      <label>
        Amount
        <input
          type="number"
          step="0.01"
          value={form.amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((current) => ({ ...current, amount: e.target.value }))
          }
          placeholder="0.00"
        />
      </label>

      <label>
        Currency
        <select
          value={form.currency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setForm((current) => ({
              ...current,
              currency: e.target.value as Currency,
            }))
          }
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>

      <label>
        Description
        <input
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((current) => ({ ...current, description: e.target.value }))
          }
          placeholder={kind === 'income' ? 'Salary' : 'Rent'}
        />
      </label>

      {form.error && <p className="error">{form.error}</p>}
      <button type="submit">{kind === 'income' ? 'Add Income' : 'Add Expense'}</button>
    </form>
  )
}

export default EntryForm
