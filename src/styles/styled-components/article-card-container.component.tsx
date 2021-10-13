import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { bp, Breakpoint } from '@/styles/mixins/breakpoints.mixin'

const ArticleCardContainer = styled.div(css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > article {
    width: 100%;
    margin-bottom: 1rem;

    ${bp(Breakpoint.S_MIN)} {
      width: calc(50% - 0.5rem);
    }
  }
`)

export default ArticleCardContainer
