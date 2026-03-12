import { useTheme } from '../context/ThemeContext'

const AppHeader = () => {
  const { theme, user, toggleTheme } = useTheme()

  return (
    <header className="app-header panel">
      <div>
        <h1>TaskFlow Control Center</h1>
        <p>
          Signed in as <strong>{user.name}</strong> ({user.role})
        </p>
      </div>
      <button type="button" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  )
}

export default AppHeader
