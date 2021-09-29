import { css } from '@emotion/react'

const root = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8rem;
  padding: 0.75rem;
  border-width: 0.15rem;
  border-style: dashed;
  border-radius: 0.3rem;
  border-color: var(--color-gray-dark);
  color: var(--color-gray-dark);
  background-color: var(--color-gray-light);
  cursor: pointer;
`

const rootVariant = (isAccepted: boolean, isRejected: boolean) => {
  if (isAccepted) {
    return css`
      border-color: var(--color-info-main);
      color: var(--color-info-main);
      background-color: var(--color-info-light);
    `
  }
  if (isRejected) {
    return css`
      border-color: var(--color-error-main);
      color: var(--color-error-main);
      background-color: var(--color-error-light);
    `
  }
}

const styles = {
  root,
  rootVariant,
}

export default styles
