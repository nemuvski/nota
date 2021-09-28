import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { selectToast } from '@/stores/toast/selector'
import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5'
import { removeToast } from '@/stores/toast/slice'
import { TOAST_DISPLAY_DURATION } from '@/constants/toast'
import { useTimeout } from '@/hooks/time'
import Styles from '@/styles/toast.style'

type Props = {
  toastId: string
}

const Toast: React.FC<Props> = ({ toastId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const toast = useSelector(selectToast(toastId))

  // 時間経過後にストアから削除
  useTimeout(() => dispatch(removeToast(toastId)), TOAST_DISPLAY_DURATION)

  if (!toast) return null

  return (
    <div css={[Styles.root, Styles.rootVariant(toast.level)]}>
      <div css={Styles.icon}>
        {toast.level === 'success' && <IoCheckmarkCircleOutline />}
        {toast.level === 'info' && <IoInformationCircleOutline />}
        {toast.level === 'warning' && <IoWarningOutline />}
        {toast.level === 'error' && <IoAlertCircleOutline />}
      </div>
      <div css={Styles.content}>{toast.content}</div>
    </div>
  )
}

export default Toast
