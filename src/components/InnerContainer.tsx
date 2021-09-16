import React from 'react'
import Styles from '@/styles/inner-container.style'

type Props = {
  isWide?: boolean
}

const InnerContainer: React.FC<Props> = ({ isWide = false, children }) => {
  return <div css={[Styles.root, isWide && Styles.isWide]}>{children}</div>
}

export default InnerContainer
