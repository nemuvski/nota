import { useDispatch } from 'react-redux'
import { addToast } from '@/stores/toast/slice'
import { buildToastContent } from '@/models/Toast'
import { useCallback } from 'react'

/**
 * Toastを登録メソッドを提供する
 */
export const useToast = () => {
  const dispatch = useDispatch()

  const add = useCallback(
    (level: Level, content: string) => {
      dispatch(addToast(buildToastContent(level, content)))
    },
    [dispatch]
  )

  return { addToast: add }
}
