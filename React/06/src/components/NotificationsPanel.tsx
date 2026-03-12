import { useShallow } from 'zustand/react/shallow'
import { useDesignHubStore } from '../store'
import { createId, formatTimestamp } from '../utils/formatters'

export function NotificationsPanel() {
  const unreadNotifications = useDesignHubStore(
    useShallow((state) => state.notifications.filter((notification) => !notification.read)),
  )
  const markAsRead = useDesignHubStore((state) => state.markAsRead)
  const clearNotifications = useDesignHubStore((state) => state.clearNotifications)
  const addNotification = useDesignHubStore((state) => state.addNotification)
  const currentUser = useDesignHubStore((state) => state.currentUser)

  const handleCreateNotification = () => {
    addNotification({
      id: createId('notification'),
      message: `${currentUser?.name ?? 'A guest'} triggered a handoff reminder.`,
      read: false,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Notifications slice</p>
          <h2>Unread inbox</h2>
        </div>
        <span className="badge">{unreadNotifications.length} unread</span>
      </div>

      <div className="stack">
        <div className="notification-toolbar">
          <button type="button" className="button" onClick={handleCreateNotification}>
            Add notification
          </button>
          <button
            type="button"
            className="button button--danger"
            onClick={clearNotifications}
            disabled={unreadNotifications.length === 0}
          >
            Clear all
          </button>
        </div>

        <div className="notification-list">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <article key={notification.id} className="notification-item">
                <div className="notification-item__header">
                  <strong>{notification.message}</strong>
                  <small>{formatTimestamp(notification.createdAt)}</small>
                </div>
                <div className="notification-item__actions">
                  <button
                    type="button"
                    className="button button--ghost"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">No unread notifications. The slice is idle.</p>
          )}
        </div>
      </div>
    </section>
  )
}
