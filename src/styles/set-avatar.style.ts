import { css } from '@emotion/react'

const root = css`
  position: relative;
  display: flex;
  justify-content: center;
`

const image = css`
  width: 100%;
  max-width: 16rem;
  cursor: pointer;
`

const editIconWrapper = css`
  position: absolute;
  bottom: 1rem;
  left: calc(50% + 3.7rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  color: var(--color-back);
  background-color: var(--color-text);
`

const editIcon = css`
  width: 1.5rem;
`

const styles = {
  root,
  image,
  editIconWrapper,
  editIcon,
}

export default styles
