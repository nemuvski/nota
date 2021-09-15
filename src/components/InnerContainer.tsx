import React from 'react'
import Styles from '@/styles/inner-container.style'

const InnerContainer: React.FC = ({ children }) => <div css={Styles.root}>{children}</div>

export default InnerContainer
