import { useNotificationStore } from '../store/notificationStore'

const NotificationList = () => {
  const notifications = useNotificationStore((state) => state.notifications)
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  )
  const markAsRead = useNotificationStore((state) => state.markAsRead)
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications,
  )

  return (
    <section className="panel">
      <div className="section-header">
        <h2>Unread Notifications</h2>
        <button type="button" onClick={clearNotifications}>
          Clear All
        </button>
      </div>

      {unreadNotifications.length === 0 ? (
        <p className="muted">All caught up. No unread notifications.</p>
      ) : (
        <ul className="notification-list">
          {unreadNotifications.map((notification) => (
            <li key={notification.id} className={`notification ${notification.type}`}>
              <div>
                <p>{notification.message}</p>
                <span className="chip">{notification.type}</span>
              </div>
              <button
                type="button"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default NotificationList
