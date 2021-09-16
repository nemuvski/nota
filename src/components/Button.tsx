import React, { MouseEventHandler } from 'react'
import Styles from '@/styles/button.style'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'outlined' | 'contained'
  color?: 'primary' | 'secondary'
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button: React.FC<Props> = ({ type = 'button', variant = 'outlined', color, onClick, children }) => {
  return (
    <button type={type} onClick={onClick} css={[Styles.root]}>
      {children}
    </button>
  )
}

export default Button
