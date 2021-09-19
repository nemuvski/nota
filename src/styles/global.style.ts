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
    --color-success-dark: rgb(30, 71, 32);
    --color-success-main: rgb(93, 182, 97);
    --color-success-light: rgb(237, 247, 237);
    --color-info-dark: rgb(0, 67, 97);
    --color-info-main: rgb(38, 178, 245);
    --color-info-light: rgb(230, 246, 253);
    --color-warning-dark: rgb(102, 60, 0);
    --color-warning-main: rgb(255, 162, 41);
    --color-warning-light: rgb(255, 244, 229);
    --color-error-dark: rgb(95, 34, 33);
    --color-error-main: rgb(241, 100, 97);
    --color-error-light: rgb(253, 237, 237);
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
      padding: 0;
      cursor: pointer;
      outline: none;
      border: 0;
      background-color: transparent;
    }

    a {
      color: var(--color-text);
      text-decoration: none;
    }

    svg {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  `
)
