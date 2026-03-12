import type { StateCreator } from 'zustand'

export interface DesignUser {
  id: string
  name: string
  role: string
}

export interface DesignFile {
  id: string
  name: string
  content: string
  updatedAt: string
}

export interface Comment {
  id: string
  fileId: string
  author: string
  text: string
  createdAt: string
}

export interface DesignNotification {
  id: string
  message: string
  read: boolean
  createdAt: string
}

export interface UserSlice {
  currentUser: DesignUser | null
  setCurrentUser: (user: DesignUser) => void
  clearCurrentUser: () => void
}

export interface FileSlice {
  files: DesignFile[]
  activeFileId: string | null
  addFile: (file: DesignFile) => void
  updateFileContent: (id: string, content: string) => void
  selectFile: (id: string) => void
}

export interface CommentSlice {
  comments: Comment[]
  addComment: (comment: Comment) => void
  getCommentsByFile: (fileId: string) => Comment[]
}

export interface NotificationsSlice {
  notifications: DesignNotification[]
  addNotification: (notification: DesignNotification) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export type DesignHubStore = UserSlice &
  FileSlice &
  CommentSlice &
  NotificationsSlice

export type DesignHubSlice<TSlice> = StateCreator<
  DesignHubStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  TSlice
>
