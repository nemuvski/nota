import React from 'react'
import Link from 'next/link'
import { Article } from '@/models/Article'
import { dateFormat } from '@/utils/date'
import ArticleCardThumbnail from '@/styles/styled-components/article-card-thumbnail.component'

type Props = {
  article: Article
  isAdminLink?: boolean
}

const ArticleCard: React.FC<Props> = ({ article, isAdminLink = false }) => {
  return (
    <article>
      <Link href={isAdminLink ? `/own/articles/${article.id}` : `/articles/${article.id}`}>
        <a>
          <ArticleCardThumbnail alt={article.title} src={article.thumbnailUrl} />
          <div>
            <time>{dateFormat(article.createdAt)}</time>
            <h1>{article.title}</h1>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default ArticleCard
