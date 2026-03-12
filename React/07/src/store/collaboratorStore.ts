import { create } from 'zustand'
import type { Collaborator, CollaboratorStore } from './types'

const initialCollaborators: Collaborator[] = []

export const useCollaboratorStore = create<CollaboratorStore>()((set) => ({
  collaborators: initialCollaborators,
  setCollaborators: (collaborators) => set({ collaborators }),
  clearCollaborators: () => set({ collaborators: [] }),
}))
