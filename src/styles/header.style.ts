import { css } from '@emotion/react'

const header = css`
  position: fixed;
  z-index: 10;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.5rem;
  background-color: var(--color-primary);
  border-bottom: 0.25rem solid var(--color-primary-light);
  transition: opacity ease-in-out 0.3s;
`

const headerTitle = css`
  font-family: 'Lobster', cursive;
  font-size: 2.2rem;
  letter-spacing: 0.15rem;
`

const spacer = css`
  height: 4.5rem;
  margin-bottom: 1.5rem;
`

const styles = {
  header,
  headerTitle,
  spacer,
}

export default styles
