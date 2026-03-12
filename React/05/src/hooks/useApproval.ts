import { useState } from 'react'

export const useApproval = () => {
  const [approved, setApproved] = useState(false)

  const approve = () => {
    setApproved(true)
  }

  return { approved, approve }
}
