import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import Styles from '@/styles/modal.style'

type Props = {
  closeAction: () => void
}

const Modal: React.FC<Props> = ({ children, closeAction }) => {
  return (
    <ClientOnlyPortal>
      <div css={Styles.root} onClick={() => closeAction()}>
        <div css={Styles.inner} onClick={(event) => event.stopPropagation()}>
          <div css={Styles.close}>
            <IoCloseSharp css={Styles.icon} />
            Close
          </div>
          <div css={Styles.content}>{children}</div>
        </div>
      </div>
    </ClientOnlyPortal>
  )
}

export default Modal
