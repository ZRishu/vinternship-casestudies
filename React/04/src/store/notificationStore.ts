import { create } from 'zustand'
import type { NewNotification, Notification } from '../types/notification'

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: NewNotification) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          read: false,
        },
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
}))
