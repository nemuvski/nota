import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import ClientOnlyPortal from '@/components/ClientOnlyPortal'
import Styles from '@/styles/modal.style'

type Props = {
  closeAction: () => void
}

const Modal: React.FC<Props> = ({ children, closeAction }) => (
  <ClientOnlyPortal>
    <div css={Styles.root} onClick={() => closeAction()}>
      <div css={Styles.inner}>
        <div css={Styles.close}>
          <IoCloseSharp css={Styles.icon} />
          Close
        </div>
        <div css={Styles.content} onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  </ClientOnlyPortal>
)

export default Modal
