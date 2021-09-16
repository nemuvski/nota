import { css } from '@emotion/react'

const root = css`
  width: 100%;
  max-width: calc(700px + 1.5rem);
  margin: 0 auto;
  padding: 0 0.75rem;
  transition: max-width ease-in-out 0.3s;
`

const isWide = css`
  max-width: calc(750px + 1.5rem);
`

const styles = {
  root,
  isWide,
}

export default styles
