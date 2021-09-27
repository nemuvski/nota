import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { bp, Breakpoint } from '@/styles/mixins/breakpoints.mixin'

const FormActions = styled.div(css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  ${bp(Breakpoint.S_MIN)} {
    flex-direction: row;
  }

  > button {
    ${bp(Breakpoint.XS_MAX, false)} {
      width: 100%;
      &:not(:last-of-type) {
        margin-bottom: 0.75rem;
      }
    }
    ${bp(Breakpoint.S_MIN)} {
      &:not(:last-of-type) {
        margin-right: 0.75rem;
      }
    }
  }
`)

export default FormActions
