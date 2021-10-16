import React, { useMemo } from 'react'
import { BsPencilSquare, BsArrowRepeat } from 'react-icons/bs'
import { Article } from '@/models/Article'
import { dateFormat } from '@/utils/date'
import Styles from '@/styles/article-detail.style'
import { convertToHTMLFromRaw } from '@/libs/draft-js'

type Props = {
  article: Article
}

const ArticleDetail: React.FC<Props> = ({ article }) => {
  // 作成日時と更新日時が一致している場合は新規作成されて一度も編集されていないと判定する
  const isUpdated = useMemo(() => !article.createdAt.isSame(article.updatedAt), [article.createdAt, article.updatedAt])
  const innerHTML = useMemo(() => convertToHTMLFromRaw(article.body), [article.body])

  return (
    <article>
      {article.thumbnailUrl && <img css={Styles.thumbnail} src={article.thumbnailUrl} alt={article.title} />}

      <div css={Styles.header}>
        <h1 css={Styles.title}>{article.title}</h1>
        <div css={Styles.dateContainer}>
          <time css={Styles.date}>
            <BsPencilSquare css={Styles.dateIcon} />
            {dateFormat(article.createdAt, 'YYYY-MM-DD HH:mm:ss')}
          </time>

          {isUpdated && (
            <time css={Styles.date}>
              <BsArrowRepeat css={Styles.dateIcon} />
              {dateFormat(article.updatedAt, 'YYYY-MM-DD HH:mm:ss')}
            </time>
          )}
        </div>
      </div>

      <div css={Styles.body} dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </article>
  )
}

export default ArticleDetail
