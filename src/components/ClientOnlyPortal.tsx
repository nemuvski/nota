import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const ClientOnlyPortal: React.FC = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    ref.current = document.getElementById('portal')
  }, [])

  return ref.current ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal
