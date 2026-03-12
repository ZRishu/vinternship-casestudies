import type { Collaborator } from '../store/types'

const collaboratorResponse: Collaborator[] = [
  { id: 'col-1', name: 'Alex Chen', role: 'Designer', status: 'Reviewing note threads' },
  { id: 'col-2', name: 'Maya Patel', role: 'Engineer', status: 'Syncing offline edits' },
  { id: 'col-3', name: 'Jordan Lee', role: 'Product', status: 'Approving release checklist' },
]

export async function fetchCollaboratorsFromApi() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return collaboratorResponse
}
