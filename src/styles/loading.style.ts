import { css } from '@emotion/react'

const root = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  background-color: var(--color-back);
`

const animation = css`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  width: 0.9rem;
  height: 0.9rem;
  margin: auto;
  overflow: hidden;
  box-shadow: var(--color-primary-light) 1.5rem 0 0 0, var(--color-secondary-light) 1.1rem 1.1rem 0 0,
    var(--color-primary-light) 0 1.5rem 0 0, var(--color-secondary-light) -1.1rem 1.1rem 0 0,
    var(--color-primary-light) -1.5rem 0 0 0, var(--color-secondary-light) -1.1rem -1.1rem 0 0,
    var(--color-primary-light) 0 -1.5rem 0 0, var(--color-secondary-light) 1.1rem -1.1rem 0 0;
  border-radius: 0.5rem;
  font-size: 10px;
  text-indent: 100%;
  animation: spinner 1700ms infinite linear;
`

const styles = {
  root,
  animation,
}

export default styles
