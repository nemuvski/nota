import React, { useState } from 'react'
import { IoCameraReverse } from 'react-icons/io5'
import SetAvatarModal from '@/components/SetAvatarModal'
import Avatar from '@/styles/styled-components/avatar.component'
import Styles from '@/styles/set-avatar.style'

type Props = {
  source?: string
}

const SetAvatar: React.FC<Props> = ({ source }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  if (!source) return null

  return (
    <>
      <div css={Styles.root}>
        <Avatar css={Styles.image} src={source} onClick={() => setIsOpenModal(true)} />
        <div css={Styles.editIconWrapper}>
          <IoCameraReverse css={Styles.editIcon} />
        </div>
      </div>
      {isOpenModal && <SetAvatarModal closeAction={() => setIsOpenModal(false)} />}
    </>
  )
}

export default SetAvatar
