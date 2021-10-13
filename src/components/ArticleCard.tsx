import React from 'react'
import Link from 'next/link'
import { BsPencilSquare } from 'react-icons/bs'
import { Article } from '@/models/Article'
import { dateFormat } from '@/utils/date'
import Styles from '@/styles/article-card.style'
import ArticleCardThumbnail from '@/styles/styled-components/article-card-thumbnail.component'

type Props = {
  article: Article
  isAdminLink?: boolean
}

const ArticleCard: React.FC<Props> = ({ article, isAdminLink = false }) => (
  <article css={Styles.root}>
    <Link href={isAdminLink ? `/own/articles/${article.id}` : `/articles/${article.id}`}>
      <a css={Styles.inner}>
        <ArticleCardThumbnail alt={article.title} src={article.thumbnailUrl} />
        <div css={Styles.info}>
          <h1 css={Styles.title}>{article.title}</h1>
          <time css={Styles.date}>
            <BsPencilSquare css={Styles.dateIcon} />
            {dateFormat(article.updatedAt)}
          </time>
        </div>
      </a>
    </Link>
  </article>
)

export default ArticleCard
