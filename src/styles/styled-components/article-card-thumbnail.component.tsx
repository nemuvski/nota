import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { THUMBNAIL_ASPECT_RATIO } from '@/constants/article'

const ArticleCardThumbnail = styled.img(css`
  display: block;
  width: 100%;
  object-fit: cover;
  aspect-ratio: ${THUMBNAIL_ASPECT_RATIO};
  background-color: var(--color-gray-main);
`)

ArticleCardThumbnail.defaultProps = {
  src: '/assets/article-thumbnail-placeholder.png',
}

export default ArticleCardThumbnail
