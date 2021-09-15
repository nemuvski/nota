import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/breakpoints.mixin'

const googleFonts = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
`

const palette = css`
  :root {
  }
`

export default css(
  googleFonts,
  palette,
  css`
    html {
      scroll-behavior: auto;
      font-size: 15px;

      ${bp(Breakpoint.M_MIN)} {
        font-size: 16px;
      }

      &:focus-within {
        scroll-behavior: auto;
      }
    }

    body {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.15;
    }

    small {
      font-size: 0.8rem;
    }

    input,
    button {
      appearance: none;
      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    button {
      cursor: pointer;
      outline: none;
      border: 0;
    }
  `
)
