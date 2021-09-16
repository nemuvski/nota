import React from 'react'
import Styles from '@/styles/inner-container.style'

type Props = {
  size?: 'large' | 'medium'
}

const InnerContainer: React.FC<Props> = ({ size = 'medium', children }) => {
  return <div css={[Styles.root, size === 'large' && Styles.isLarge]}>{children}</div>
}

export default InnerContainer
