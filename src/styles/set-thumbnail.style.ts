import { css } from '@emotion/react'

const root = css``

const imageWrapper = css`
  margin-bottom: 0.75rem;

  > img {
    width: 100%;
  }
`

const actions = css`
  display: flex;
  align-items: center;

  > button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`

const actionsVariant = css`
  justify-content: center;
`

const styles = {
  root,
  imageWrapper,
  actions,
  actionsVariant,
}

export default styles
