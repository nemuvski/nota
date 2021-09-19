import { css } from '@emotion/react'

const header = css`
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.5rem;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--color-back);
  background-color: var(--color-back);
  transition-property: height, border;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
`

const isScrolled = css`
  height: 3.75rem;
  border-bottom-color: var(--color-gray-light);
`

const headerInner = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: var(--color-text);
    &:hover {
      text-decoration: none;
    }
  }
`

const headerTitle = css`
  font-family: 'Lobster', cursive;
  font-size: 2.2rem;
  letter-spacing: 0.15rem;
`

const spacer = css`
  height: 4.5rem;
`

const styles = {
  header,
  isScrolled,
  headerInner,
  headerTitle,
  spacer,
}

export default styles
