import { fireEvent, render, screen } from '@testing-library/react'
import { CommentBox } from '../CommentBox'

describe('CommentBox', () => {
  test('renders input and Post button', () => {
    render(<CommentBox onPost={() => {}} />)

    expect(screen.getByLabelText('Comment input')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument()
  })

  test('calls onPost with input value when clicked', () => {
    const onPost = jest.fn()
    render(<CommentBox onPost={onPost} />)

    fireEvent.change(screen.getByLabelText('Comment input'), {
      target: { value: 'Publish this comment' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Post' }))

    expect(onPost).toHaveBeenCalledWith('Publish this comment')
    expect(onPost).toHaveBeenCalledTimes(1)
  })

  test('clears input after posting', () => {
    const onPost = jest.fn()
    render(<CommentBox onPost={onPost} />)

    const input = screen.getByLabelText('Comment input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Clear me' } })
    fireEvent.click(screen.getByRole('button', { name: 'Post' }))

    expect(input.value).toBe('')
  })
})
