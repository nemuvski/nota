import { css } from '@emotion/react'

const actions = css`
  position: fixed;
  z-index: 10;
  left: 50%;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: calc(360px + 1.5rem);
  padding: 0 0.75rem;
  transform: translateX(-50%);

  > button {
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`

const styles = {
  actions,
}

export default styles
