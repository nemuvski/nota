import { css } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  color?: 'primary' | 'secondary'
}

const Button = styled.button<Props>(
  css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 5.5rem;
    min-height: 2.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.3rem;
  `,
  ({ color }) => {
    let bgColor = 'transparent'
    let hoverBgColor = 'var(--color-gray-main)'
    let textColor = 'var(--color-text)'

    if (color === 'primary') {
      bgColor = 'var(--color-primary-main)'
      hoverBgColor = 'var(--color-primary-dark)'
      textColor = 'var(--color-back)'
    } else if (color === 'secondary') {
      bgColor = 'var(--color-secondary-main)'
      hoverBgColor = 'var(--color-secondary-dark)'
      textColor = 'var(--color-back)'
    }

    return css`
      background-color: ${bgColor};
      color: ${textColor};
      &:not(:disabled):hover {
        background-color: ${hoverBgColor};
      }
    `
  }
)

export default Button
