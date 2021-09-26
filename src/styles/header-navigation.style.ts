import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/mixins/breakpoints.mixin'

const root = css`
  position: relative;
`

const list = css`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  ${bp(Breakpoint.XS_MAX, false)} {
    display: none;
  }

  ${bp(Breakpoint.S_MIN)} {
    li:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`

const listOpened = css`
  ${bp(Breakpoint.XS_MAX, false)} {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 3rem;
    display: flex;
    flex-direction: column;
    width: 8.5rem;
    padding: 0.75rem;
    border-radius: 0 0 0.3rem 0.3rem;
    background-color: var(--color-back);

    li,
    button {
      width: 100%;
    }
    li:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }
`

const toggle = css`
  display: block;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.1rem;
  background-color: transparent;

  ${bp(Breakpoint.S_MIN)} {
    display: none;
  }
`

const styles = {
  root,
  list,
  listOpened,
  toggle,
}

export default styles
