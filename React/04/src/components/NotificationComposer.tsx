import { useState } from 'react'
import { useNotificationStore } from '../store/notificationStore'
import type { NotificationType } from '../types/notification'

const notificationTypes: NotificationType[] = ['info', 'success', 'error']

const NotificationComposer = () => {
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NotificationType>('info')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return
    }

    addNotification({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      message: trimmedMessage,
      type,
    })

    setMessage('')
    setType('info')
  }

  return (
    <section className="panel">
      <h2>Create Notification</h2>
      <form className="composer" onSubmit={handleSubmit}>
        <label>
          Message
          <input
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            placeholder="Sprint planning starts at 10 AM."
          />
        </label>

        <label>
          Type
          <select
            value={type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setType(e.target.value as NotificationType)
            }
          >
            {notificationTypes.map((notificationType) => (
              <option key={notificationType} value={notificationType}>
                {notificationType}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Notification</button>
      </form>
    </section>
  )
}

export default NotificationComposer
