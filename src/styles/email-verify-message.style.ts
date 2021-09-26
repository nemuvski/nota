import { css } from '@emotion/react'

const content = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 4.5rem;
  margin-left: 1rem;
  padding: 0.2rem 0;
  border: 1px solid var(--color-warning-dark);
  border-radius: 0.3rem;
  color: var(--color-warning-dark);

  &:hover {
    opacity: 0.8;
  }
`

const buttonIcon = css`
  width: 1rem;
  margin-right: 0.3rem;
`

const styles = {
  content,
  button,
  buttonIcon,
}

export default styles
