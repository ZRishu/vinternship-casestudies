import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { SessionRole, SessionStore } from './types'

const defaultExpiresAt = () => Date.now() + 1000 * 60 * 30

type PersistedSessionState = {
  userId?: string
  token?: string
  role?: SessionRole
}

export const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      (set) => ({
        userId: 'alex',
        token: 'alex-token-demo',
        expiresAt: defaultExpiresAt(),
        role: 'user',
        setSession: ({ userId, token, expiresAt, role }) =>
          set(
            {
              userId,
              token,
              expiresAt,
              role,
            },
            false,
            'session/setSession',
          ),
        setRole: (role) => set({ role }, false, 'session/setRole'),
        extendSession: () =>
          set(
            (state) => ({ expiresAt: state.expiresAt + 1000 * 60 * 15 }),
            false,
            'session/extendSession',
          ),
        clearSession: () =>
          set(
            {
              userId: 'guest',
              token: 'guest-token',
              expiresAt: defaultExpiresAt(),
              role: 'user',
            },
            false,
            'session/clearSession',
          ),
      }),
      {
        name: 'collabnotes-session',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          userId: state.userId,
          token: state.token,
        }),
        version: 2,
        migrate: (persistedState, version): PersistedSessionState => {
          const session = (persistedState ?? {}) as PersistedSessionState

          if (version < 2) {
            return {
              ...session,
              role: 'user',
            }
          }

          return {
            ...session,
            role: session.role ?? 'user',
          }
        },
      },
    ),
    { name: 'session-store' },
  ),
)
