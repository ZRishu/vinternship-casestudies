import BudgetTracker from './components/BudgetTracker'
import type { ConversionRates } from './types/budget'
import './App.css'

const conversionRates: ConversionRates = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
}

function App() {
  return (
    <main className="app">
      <BudgetTracker conversionRates={conversionRates} />
    </main>
  )
}

export default App
