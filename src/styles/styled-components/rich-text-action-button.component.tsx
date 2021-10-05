import { css } from '@emotion/react'
import styled from '@emotion/styled'

const RichTextActionButton = styled.button(
  css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background-color: var(--color-gray-main);
    color: var(--color-text);
    &:not(:disabled):hover {
      background-color: var(--color-gray-dark);
    }
  `
)

RichTextActionButton.defaultProps = {
  type: 'button',
  'aria-hidden': true,
}

export default RichTextActionButton
