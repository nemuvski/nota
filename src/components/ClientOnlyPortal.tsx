import React from 'react'
import { createPortal } from 'react-dom'
import { isBrowser } from '@/utils/environment'

const ClientOnlyPortal: React.FC = ({ children }) => {
  let ref: HTMLElement | null = null
  if (isBrowser()) {
    ref = document.getElementById('__next')
  }
  return ref ? createPortal(children, ref) : null
}

export default ClientOnlyPortal
