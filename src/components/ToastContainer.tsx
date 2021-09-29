import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllToasts } from '@/stores/toast/selector'
import Toast from '@/components/Toast'
import Styles from '@/styles/toast-container.style'
import ClientOnlyPortal from '@/components/ClientOnlyPortal'

const ToastContainer = () => {
  const toasts = useSelector(selectAllToasts)

  if (!toasts.length) return null

  return (
    <ClientOnlyPortal>
      <div css={Styles.root}>
        {toasts.map((toast) => (
          <div key={toast.id} css={Styles.toast}>
            <Toast toastId={toast.id} />
          </div>
        ))}
      </div>
    </ClientOnlyPortal>
  )
}

export default ToastContainer
