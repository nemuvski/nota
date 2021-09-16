import { css } from '@emotion/react'

const root = css`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`

const styles = {
  root,
}

export default styles
