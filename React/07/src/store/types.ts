export type SessionRole = 'admin' | 'user'

export interface SessionStore {
  userId: string
  token: string
  expiresAt: number
  role: SessionRole
  setSession: (payload: {
    userId: string
    token: string
    expiresAt: number
    role: SessionRole
  }) => void
  setRole: (role: SessionRole) => void
  extendSession: () => void
  clearSession: () => void
}

export interface Note {
  id: string
  title: string
  text: string
  updatedAt: number
}

export interface HistoryEntry {
  id: string
  noteId: string
  action: string
  timestamp: number
}

export interface NoteStore {
  notes: Note[]
  addNote: (note: Note) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
  syncNote: (id: string) => void
}

export interface NoteHistoryStore {
  history: HistoryEntry[]
  addHistoryEntry: (entry: HistoryEntry) => void
  clearHistory: () => void
}

export interface Collaborator {
  id: string
  name: string
  role: string
  status: string
}

export interface CollaboratorStore {
  collaborators: Collaborator[]
  setCollaborators: (collaborators: Collaborator[]) => void
  clearCollaborators: () => void
}
