import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMyArticles } from '@/stores/article/selector'
import { ArticleStatus } from '@/models/Article'
import ArticleCard from '@/components/ArticleCard'
import ButtonList from '@/styles/styled-components/button-list.component'
import Button from '@/styles/styled-components/button.component'
import ArticleCardContainer from '@/styles/styled-components/article-card-container.component'

type Props = {
  numArticles?: number
}

const OwnArticleList: React.FC<Props> = ({ numArticles }) => {
  const [isPublishedMode, setIsPublishedMode] = useState(true)
  const publishedArticles = useSelector(selectMyArticles(ArticleStatus.Published, numArticles))
  const draftArticles = useSelector(selectMyArticles(ArticleStatus.Draft, numArticles))

  return (
    <div>
      <ButtonList>
        <Button type='button' onClick={() => setIsPublishedMode(true)} color={isPublishedMode ? 'gray' : undefined}>
          Published
        </Button>
        <Button type='button' onClick={() => setIsPublishedMode(false)} color={isPublishedMode ? undefined : 'gray'}>
          Draft
        </Button>
      </ButtonList>

      <ArticleCardContainer>
        {(isPublishedMode ? publishedArticles : draftArticles).map((article) => (
          <ArticleCard key={article.id} article={article} isAdminLink={true} />
        ))}
      </ArticleCardContainer>
    </div>
  )
}

export default OwnArticleList
