import { ArticleCard } from './ArticleCard'
import { useApproval } from '../hooks/useApproval'

interface Article {
  id: string
  title: string
  author: string
}

interface ArticleApprovalProps {
  article: Article
}

export const ArticleApproval = ({ article }: ArticleApprovalProps) => {
  const { approved, approve } = useApproval()

  return (
    <div>
      <ArticleCard
        title={article.title}
        author={article.author}
        onApprove={approve}
      />
      {approved && <span>Approved!</span>}
    </div>
  )
}
