import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { HistoryEntry, NoteHistoryStore } from './types'

const starterHistory: HistoryEntry[] = [
  {
    id: 'history-seed',
    noteId: 'note-seed-1',
    action: 'sync',
    timestamp: Date.now() - 1000 * 60 * 10,
  },
]

export const useNoteHistoryStore = create<NoteHistoryStore>()(
  devtools(
    immer((set) => ({
      history: starterHistory,
      addHistoryEntry: (entry) =>
        set((state) => {
          state.history.unshift(entry)
        }),
      clearHistory: () =>
        set((state) => {
          state.history = []
        }),
    })),
    { name: 'note-history-store' },
  ),
)

useNoteHistoryStore.subscribe((nextState, previousState) => {
  if (nextState !== previousState) {
    console.log('[note-history-store]', {
      previous: previousState,
      next: nextState,
    })
  }
})
