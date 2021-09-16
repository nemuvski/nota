import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/breakpoints.mixin'

const googleFonts = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Lobster&display=swap');
`

const palette = css`
  :root {
    --color-back: rgb(255, 255, 255);
    --color-text: rgb(35, 30, 35);
    --color-gray-main: rgb(220, 220, 220);
    --color-gray-light: rgb(235, 235, 235);
    --color-primary-dark: rgb(51, 149, 146);
    --color-primary-main: rgb(57, 166, 163);
    --color-primary-light: rgb(222, 238, 234);
    --color-secondary-dark: rgb(171, 17, 89);
    --color-secondary-main: rgb(191, 19, 99);
    --color-secondary-light: rgb(238, 207, 221);
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
      background-color: var(--color-back);
      color: var(--color-text);
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

    a {
      color: var(--color-text);
      text-decoration: none;
    }
  `
)
