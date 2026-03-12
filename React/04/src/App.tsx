import './App.css'
import AppHeader from './components/AppHeader'
import NotificationComposer from './components/NotificationComposer'
import NotificationList from './components/NotificationList'

function App() {
  return (
    <main className="app">
      <AppHeader />
      <div className="grid">
        <NotificationComposer />
        <NotificationList />
      </div>
    </main>
  )
}

export default App
