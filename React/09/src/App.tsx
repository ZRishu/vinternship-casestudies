import { lazy, Suspense, useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import './App.css'

const AdminPanel = lazy(() => import('./features/AdminPanel'))
const ProfileSettings = lazy(() => import('./features/ProfileSettings'))
const BrokenProfileSettings = lazy(async () => {
  throw new Error('Failed to load the settings bundle.')
})

function App() {
  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">Lazy loading demo</p>
        <h1>EduStream feature bundles</h1>
        <p className="lede">
          The main shell loads immediately. Settings and admin features are split into
          separate chunks and downloaded only when the user needs them.
        </p>
      </section>

      <nav className="panel nav-row" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => navClassName(isActive)}>
          Dashboard
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => navClassName(isActive)}>
          Admin
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <ErrorBoundary
              title="Admin bundle failed"
              message="The admin feature could not be loaded. Retry the route bundle."
            >
              <Suspense fallback={<LoadingSpinner label="Loading admin panel..." />}>
                <AdminPanel />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </main>
  )
}

function HomePage() {
  const [showSettings, setShowSettings] = useState(false)
  const [simulateSettingsError, setSimulateSettingsError] = useState(false)
  const [settingsBoundaryKey, setSettingsBoundaryKey] = useState(0)

  const LazySettingsComponent = useMemo(
    () => (simulateSettingsError ? BrokenProfileSettings : ProfileSettings),
    [simulateSettingsError],
  )

  return (
    <section className="layout-grid">
      <section className="panel panel--sidebar">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Core shell</p>
            <h2>Always-loaded dashboard</h2>
          </div>
          <span className="badge">Main bundle</span>
        </div>

        <div className="stack">
          <div className="surface">
            <strong>Course feed</strong>
            <p>Core navigation, summaries, and progress cards stay in the initial bundle.</p>
          </div>
          <div className="surface">
            <strong>Video library</strong>
            <p>Heavy secondary tools stay deferred until the learner asks for them.</p>
          </div>

          <div className="toolbar">
            <button
              type="button"
              className="button"
              onClick={() => setShowSettings((visible) => !visible)}
            >
              {showSettings ? 'Hide settings' : 'Settings'}
            </button>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => {
                setSimulateSettingsError((value) => !value)
                setSettingsBoundaryKey((key) => key + 1)
                setShowSettings(false)
              }}
            >
              {simulateSettingsError ? 'Disable error' : 'Simulate load error'}
            </button>
          </div>

          <p className="hint">
            Click <code>Settings</code> to lazy-load the profile settings chunk. Toggle
            the simulated error to see the error boundary handle a failed lazy import.
          </p>
        </div>
      </section>

      <section className="panel panel--content">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Component code splitting</p>
            <h2>On-demand settings panel</h2>
          </div>
          <span className="badge">{showSettings ? 'Requested' : 'Idle'}</span>
        </div>

        {showSettings ? (
          <ErrorBoundary
            key={settingsBoundaryKey}
            title="Settings bundle failed"
            message="The settings module did not load. Retry after resetting the boundary."
            onRetry={() => setSettingsBoundaryKey((key) => key + 1)}
          >
            <Suspense fallback={<LoadingSpinner label="Loading profile settings..." />}>
              <LazySettingsComponent />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div className="empty-state">
            <strong>Settings are not loaded yet.</strong>
            <p>The profile settings chunk is fetched only after the user asks for it.</p>
          </div>
        )}
      </section>
    </section>
  )
}

function navClassName(isActive: boolean) {
  return `nav-link${isActive ? ' is-active' : ''}`
}

export default App
