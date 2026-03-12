import { formatDistanceToNow } from 'date-fns'
import debounce from 'lodash/debounce'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { products, summaryMetrics } from './data/catalog'
import type { AnalysisFinding, Product } from './types'
import './App.css'

const AdminPanel = lazy(() => import('./features/AdminPanel'))

const findings: AnalysisFinding[] = [
  {
    title: 'TypeScript types',
    detail:
      'Type-only imports and interfaces are erased at build time, so they do not appear in runtime chunks.',
  },
  {
    title: 'Selective imports',
    detail:
      'The app keeps lodash to a 2.77 KiB debounce module instead of importing the whole package surface.',
  },
  {
    title: 'Code splitting',
    detail:
      'Chart.js lands in a separate admin chunk, so the customer-facing entry stays at 210.82 KiB instead of carrying analytics code upfront.',
  },
  {
    title: 'Build-only tooling',
    detail:
      'The visualizer is used only in Vite config, so it does not add runtime bytes to the browser bundle.',
  },
]

const largestLibraries = [
  {
    name: 'react-dom',
    note: '447.57 KiB rendered. This is the largest package in the analyzed output.',
  },
  {
    name: 'chart.js',
    note: '288.21 KiB rendered, but isolated behind the lazy admin panel.',
  },
  {
    name: 'date-fns',
    note: '19.46 KiB rendered. The date helper is present, but much smaller than the heavy chart bundle.',
  },
]

function App() {
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)

  const debouncedApplyQuery = useMemo(
    () =>
      debounce((value: string) => {
        setAppliedQuery(value.trim().toLowerCase())
      }, 200),
    [],
  )

  useEffect(() => {
    debouncedApplyQuery(query)

    return () => {
      debouncedApplyQuery.cancel()
    }
  }, [debouncedApplyQuery, query])

  const filteredProducts = useMemo(() => {
    if (!appliedQuery) {
      return products
    }

    return products.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.status}`.toLowerCase()
      return haystack.includes(appliedQuery)
    })
  }, [appliedQuery])

  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">Bundle analysis demo</p>
        <h1>ShopEase bundle review</h1>
        <p className="lede">
          This example shows how library imports, lazy loading, and TypeScript build settings
          affect the runtime bundle in a simple Vite + React app.
        </p>
      </section>

      <section className="summary-grid">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className="summary-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="layout-grid">
        <section className="panel panel--sidebar">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Largest libraries</p>
              <h2>Current findings</h2>
            </div>
            <span className="badge">From analyzer</span>
          </div>

          <div className="stack">
            {largestLibraries.map((library, index) => (
              <div key={library.name} className="surface">
                <strong>
                  {index + 1}. {library.name}
                </strong>
                <p>{library.note}</p>
              </div>
            ))}
          </div>

          <div className="stack">
            <div className="surface">
              <strong>Analyzer command</strong>
              <p>
                Run <code>npm run analyze</code> to generate reports in{' '}
                <code>dist/bundle-report.html</code>, <code>dist/bundle-report.md</code>, and{' '}
                <code>dist/bundle-stats.json</code>.
              </p>
            </div>
            <div className="surface">
              <strong>TypeScript result</strong>
              <p>
                <code>module</code> is already <code>ESNext</code> in{' '}
                <code>tsconfig.app.json</code>, so there is no extra shrink from changing it.
              </p>
            </div>
          </div>
        </section>

        <section className="panel panel--content">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Selective imports</p>
              <h2>Product listing</h2>
            </div>
            <span className="badge">{filteredProducts.length} items</span>
          </div>

          <div className="stack">
            <label className="field">
              <span>Search products</span>
              <input
                className="input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by name, category, or status"
              />
            </label>

            <div className="list">
              {filteredProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="layout-grid">
        <section className="panel panel--sidebar">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Optimization steps</p>
              <h2>What changed</h2>
            </div>
          </div>

          <div className="stack">
            {findings.map((finding) => (
              <div key={finding.title} className="surface">
                <strong>{finding.title}</strong>
                <p>{finding.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel panel--content">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Bonus: code splitting</p>
              <h2>Rarely used admin page</h2>
            </div>
            <button
              type="button"
              className="button"
              onClick={() => setShowAdmin((visible) => !visible)}
            >
              {showAdmin ? 'Hide admin page' : 'Load admin page'}
            </button>
          </div>

          {showAdmin ? (
            <Suspense fallback={<div className="surface">Loading admin analytics chunk...</div>}>
              <AdminPanel />
            </Suspense>
          ) : (
            <div className="surface">
              <strong>Initial bundle stays lean</strong>
              <p>
                Admin analytics code is not fetched until this panel is opened, which keeps
                the customer-facing path smaller.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

function ProductRow({ product }: { product: Product }) {
  return (
    <article className="surface">
      <div className="panel__header">
        <div>
          <strong>{product.name}</strong>
          <p>{product.category}</p>
        </div>
        <span className="badge">{product.status}</span>
      </div>

      <div className="meta-row">
        <small>Updated {formatDistanceToNow(product.updatedAt, { addSuffix: true })}</small>
        <small>{product.region}</small>
      </div>
    </article>
  )
}

export default App
