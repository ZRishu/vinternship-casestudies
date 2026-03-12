import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCollaboratorsFromApi } from '../api/collaborators'
import { useCollaboratorStore } from '../store/collaboratorStore'

export function useCollaboratorsSync() {
  const setCollaborators = useCollaboratorStore((state) => state.setCollaborators)
  const query = useQuery({
    queryKey: ['collaborators'],
    queryFn: fetchCollaboratorsFromApi,
    staleTime: 60_000,
  })

  useEffect(() => {
    if (query.data) {
      setCollaborators(query.data)
    }
  }, [query.data, setCollaborators])

  return query
}
