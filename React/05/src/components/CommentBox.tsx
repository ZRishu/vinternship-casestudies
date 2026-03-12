import { useState } from 'react'

interface CommentBoxProps {
  onPost: (message: string) => void
}

export const CommentBox = ({ onPost }: CommentBoxProps) => {
  const [value, setValue] = useState('')

  const handlePost = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    onPost(trimmed)
    setValue('')
  }

  return (
    <div className="comment-box">
      <input
        aria-label="Comment input"
        placeholder="Write a comment..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button type="button" onClick={handlePost}>
        Post
      </button>
    </div>
  )
}
