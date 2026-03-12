interface ArticleCardProps {
  title: string
  author: string
  onApprove: () => void
}

export const ArticleCard = ({ title, author, onApprove }: ArticleCardProps) => {
  return (
    <article className="article-card">
      <h3>{title}</h3>
      <p>By {author}</p>
      <button type="button" onClick={onApprove}>
        Approve
      </button>
    </article>
  )
}
