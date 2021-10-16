import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/mixins/breakpoints.mixin'
import { THUMBNAIL_ASPECT_RATIO } from '@/constants/article'

const thumbnail = css`
  width: 100%;
  margin-bottom: 1.5rem;
  aspect-ratio: ${THUMBNAIL_ASPECT_RATIO};
`

const header = css`
  margin-bottom: 2.5rem;
`

const title = css`
  margin: 0 0 1rem;
  font-size: 1.5rem;
`

const dateContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.9rem;

  ${bp(Breakpoint.S_MIN)} {
    flex-direction: row;
    align-items: center;
  }
`

const date = css`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

const dateIcon = css`
  width: 1rem;
`

const body = css`
  word-break: break-all;
  line-height: 1.8;

  h1 {
    font-size: 1.4rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  h3 {
    font-size: 1.15rem;
  }
`

const styles = {
  thumbnail,
  header,
  title,
  dateContainer,
  date,
  dateIcon,
  body,
}

export default styles
