import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Note, NoteStore } from './types'
import { useNoteHistoryStore } from './noteHistoryStore'
import { createId } from '../utils/createId'

const starterNotes: Note[] = [
  {
    id: 'note-seed-1',
    title: 'Weekly sync',
    text: 'Review the launch checklist and assign blockers.',
    updatedAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'note-seed-2',
    title: 'Design handoff',
    text: 'Confirm the mobile comment composer matches the latest spec.',
    updatedAt: Date.now() - 1000 * 60 * 18,
  },
]

function pushHistory(noteId: string, action: string) {
  useNoteHistoryStore.getState().addHistoryEntry({
    id: createId('history'),
    noteId,
    action,
    timestamp: Date.now(),
  })
}

export const useNoteStore = create<NoteStore>()(
  devtools(
    immer((set, get) => ({
      notes: starterNotes,
      addNote: (note) => {
        set(
          (state) => {
            state.notes.unshift(note)
          },
          false,
          'notes/addNote',
        )
        pushHistory(note.id, 'add')
      },
      updateNote: (id, text) => {
        const noteExists = get().notes.some((note) => note.id === id)

        if (!noteExists) {
          return
        }

        set(
          (state) => {
            const note = state.notes.find((entry) => entry.id === id)
            if (note) {
              note.text = text
              note.updatedAt = Date.now()
            }
          },
          false,
          'notes/updateNote',
        )
        pushHistory(id, 'edit')
      },
      deleteNote: (id) => {
        const noteExists = get().notes.some((note) => note.id === id)

        if (!noteExists) {
          return
        }

        set(
          (state) => {
            state.notes = state.notes.filter((note) => note.id !== id)
          },
          false,
          'notes/deleteNote',
        )
        pushHistory(id, 'delete')
      },
      syncNote: (id) => {
        const noteExists = get().notes.some((note) => note.id === id)

        if (!noteExists) {
          return
        }

        set(
          (state) => {
            const note = state.notes.find((entry) => entry.id === id)
            if (note) {
              note.updatedAt = Date.now()
            }
          },
          false,
          'notes/syncNote',
        )
        pushHistory(id, 'sync')
      },
    })),
    { name: 'note-store' },
  ),
)
