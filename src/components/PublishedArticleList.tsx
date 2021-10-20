import React from 'react'
import { useSelector } from 'react-redux'
import { selectPublishedArticles } from '@/stores/article/selector'
import ArticleCard from '@/components/ArticleCard'
import ArticleCardContainer from '@/styles/styled-components/article-card-container.component'

type Props = {
  numArticles?: number
}

const PublishedArticleList: React.FC<Props> = ({ numArticles }) => {
  const publishedArticles = useSelector(selectPublishedArticles(numArticles))

  return (
    <ArticleCardContainer>
      {publishedArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ArticleCardContainer>
  )
}

export default PublishedArticleList
