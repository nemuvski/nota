import React from 'react'
import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5'
import Styles from '@/styles/message.style'

type Props = {
  level?: Level
}

const Message: React.FC<Props> = ({ level = 'info', children }) => {
  return (
    <div css={[Styles.root, Styles.rootVariant(level)]}>
      <div css={[Styles.icon, Styles.iconVariant(level)]}>
        {level === 'success' && <IoCheckmarkCircleOutline />}
        {level === 'info' && <IoInformationCircleOutline />}
        {level === 'warning' && <IoWarningOutline />}
        {level === 'error' && <IoAlertCircleOutline />}
      </div>
      <div css={[Styles.content, Styles.contentVariant(level)]}>{children}</div>
    </div>
  )
}

export default Message
