import { fireEvent, render, screen } from '@testing-library/react'
import { ArticleApproval } from '../ArticleApproval'

describe('ArticleApproval', () => {
  test('shows Approved! after clicking approve', () => {
    render(
      <ArticleApproval
        article={{
          id: 'a-1',
          title: 'Metro expansion signed off',
          author: 'Tara Kim',
        }}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Approve' }))
    expect(screen.getByText('Approved!')).toBeInTheDocument()
  })
})
