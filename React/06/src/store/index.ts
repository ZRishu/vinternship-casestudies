import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createCommentSlice } from './slices/commentSlice'
import { createFileSlice } from './slices/fileSlice'
import { createNotificationsSlice } from './slices/notificationsSlice'
import { createUserSlice } from './slices/userSlice'
import type { DesignHubStore } from './types'

export const useDesignHubStore = create<DesignHubStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createUserSlice(...args),
        ...createFileSlice(...args),
        ...createCommentSlice(...args),
        ...createNotificationsSlice(...args),
      }),
      {
        name: 'designhub-store',
        partialize: (state) => ({
          currentUser: state.currentUser,
          notifications: state.notifications,
        }),
      },
    ),
    { name: 'designhub-store' },
  ),
)
