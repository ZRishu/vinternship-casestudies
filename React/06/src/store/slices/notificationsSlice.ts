import { starterNotifications } from '../demoData'
import type { DesignHubSlice, NotificationsSlice } from '../types'

export const createNotificationsSlice: DesignHubSlice<NotificationsSlice> = (set) => ({
  notifications: starterNotifications,
  addNotification: (notification) =>
    set(
      (state) => ({
        notifications: [notification, ...state.notifications],
      }),
      false,
      'notifications/addNotification',
    ),
  markAsRead: (id) =>
    set(
      (state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification,
        ),
      }),
      false,
      'notifications/markAsRead',
    ),
  clearNotifications: () =>
    set({ notifications: [] }, false, 'notifications/clearNotifications'),
})
