export type NotificationType = 'info' | 'error' | 'success'

export interface Notification {
  id: string
  message: string
  type: NotificationType
  read: boolean
}

export interface NewNotification {
  id: string
  message: string
  type: NotificationType
}
