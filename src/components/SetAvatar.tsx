import React from 'react'
import Avatar from '@/styles/styled-components/avatar.component'
import Styles from '@/styles/set-avatar.style'

type Props = {
  source?: string
}

const SetAvatar: React.FC<Props> = ({ source }) => {
  // TODO: デフォルト画像を表示するようにする
  if (!source) return null

  return (
    <div css={Styles.root}>
      <Avatar css={Styles.image} src={source} />
    </div>
  )
}

export default SetAvatar
