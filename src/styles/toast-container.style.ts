import { css } from '@emotion/react'

const root = css`
  position: fixed;
  top: 5rem;
  left: 50%;
  z-index: 10;
  width: 100%;
  max-width: calc(360px + 1.5rem);
  padding: 0 0.75rem;
  transform: translateX(-50%);
`

const toast = css`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 0.75rem;
  }
`

const styles = {
  root,
  toast,
}

export default styles
