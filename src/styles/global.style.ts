import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/breakpoints.mixin'

const googleFonts = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Lobster&display=swap');
`

const palette = css`
  :root {
    --color-back: rgb(255, 255, 255);
    --color-text: rgb(0, 0, 0);
    --color-gray-dark: rgb(210, 210, 210);
    --color-gray-main: rgb(238, 238, 238);
    --color-gray-light: rgb(248, 248, 248);
    --color-primary-dark: rgb(67, 170, 170);
    --color-primary-main: rgb(75, 189, 189);
    --color-primary-light: rgb(201, 235, 235);
    --color-secondary-dark: rgb(170, 67, 67);
    --color-secondary-main: rgb(189, 75, 75);
    --color-secondary-light: rgb(239, 183, 183);
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
        opacity: 0.8;
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
