import { useReducer } from "react";
import EntryForm from "./EntryForm";
import BalanceSummary from "./BalanceSummary";
import EntryList from "./EntryList";
import {
  createBudgetReducer,
  initialBudgetState,
} from "../reducer/budgetReducer";
import type { ConversionRates, Currency, EntryDraft } from "../types/budget";

interface BudgetTrackerProps {
  conversionRates: ConversionRates;
}

const buildEntryId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const BudgetTracker = ({ conversionRates }: BudgetTrackerProps) => {
  const [state, dispatch] = useReducer(
    createBudgetReducer(conversionRates),
    initialBudgetState,
  );

  const currencies = Object.keys(conversionRates) as Currency[];

  const handleAddIncome = (draft: EntryDraft) => {
    dispatch({
      type: "addIncome",
      entry: {
        kind: "income",
        id: buildEntryId(),
        amount: draft.amount,
        currency: draft.currency,
        timestamp: new Date().toISOString(),
        description: draft.description,
      },
    });
  };

  const handleAddExpense = (draft: EntryDraft) => {
    dispatch({
      type: "addExpense",
      entry: {
        kind: "expense",
        id: buildEntryId(),
        amount: draft.amount,
        currency: draft.currency,
        timestamp: new Date().toISOString(),
        description: draft.description,
      },
    });
  };

  return (
    <section className="tracker">
      <header className="tracker-header">
        <h1>Secure Banking Dashboard</h1>
        <label className="currency-picker">
          View Currency
          <select
            value={state.selectedCurrency}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              dispatch({
                type: "setCurrency",
                currency: e.target.value as Currency,
              })
            }
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </header>

      {state.error && (
        <div className="panel error-box">
          <p>{state.error}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: "clearError" })}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid two-col">
        <EntryForm
          kind="income"
          currencies={currencies}
          onSubmit={handleAddIncome}
        />
        <EntryForm
          kind="expense"
          currencies={currencies}
          onSubmit={handleAddExpense}
        />
      </div>

      <BalanceSummary
        incomes={state.incomes}
        expenses={state.expenses}
        selectedCurrency={state.selectedCurrency}
        conversionRates={conversionRates}
      />

      <div className="grid two-col">
        <EntryList
          title="Income Entries"
          entries={state.incomes}
          selectedCurrency={state.selectedCurrency}
          conversionRates={conversionRates}
          emptyMessage="No income entries yet."
        />
        <EntryList
          title="Expense Entries"
          entries={state.expenses}
          selectedCurrency={state.selectedCurrency}
          conversionRates={conversionRates}
          emptyMessage="No expense entries yet."
        />
      </div>

      <section className="panel">
        <h2>Audit Log (Immutable)</h2>
        {state.auditLog.length === 0 ? (
          <p>No audit events recorded.</p>
        ) : (
          <ul className="audit-list">
            {state.auditLog.map((item) => (
              <li key={item.id}>
                <span>{new Date(item.timestamp).toLocaleString()}</span>
                <span>{item.message}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default BudgetTracker;
