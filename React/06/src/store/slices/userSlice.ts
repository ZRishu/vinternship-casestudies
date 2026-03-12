import { teamUsers } from '../demoData'
import type { DesignHubSlice, UserSlice } from '../types'

export const createUserSlice: DesignHubSlice<UserSlice> = (set) => ({
  currentUser: teamUsers[0],
  setCurrentUser: (user) =>
    set({ currentUser: user }, false, 'user/setCurrentUser'),
  clearCurrentUser: () =>
    set({ currentUser: null }, false, 'user/clearCurrentUser'),
})
