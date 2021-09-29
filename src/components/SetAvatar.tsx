import React, { useState } from 'react'
import Modal from '@/components/Modal'
import Avatar from '@/styles/styled-components/avatar.component'
import Styles from '@/styles/set-avatar.style'

type Props = {
  source?: string
}

const SetAvatar: React.FC<Props> = ({ source }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  // TODO: デフォルト画像を表示するようにする
  if (!source) return null

  return (
    <>
      <div css={Styles.root}>
        <Avatar css={Styles.image} src={source} onClick={() => setIsModalOpened(true)} />
      </div>

      {isModalOpened && <Modal closeAction={() => setIsModalOpened(false)} />}
    </>
  )
}

export default SetAvatar
