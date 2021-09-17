import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Styles from '@/styles/header-navigation.style'
import Button from '@/styles/button.component'
import TrayIcon from '../assets/tray.icon.svg'
import TrayFillIcon from '../assets/tray-fill.icon.svg'

const HeaderNavigation = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav css={Styles.root}>
      <button
        css={Styles.toggle}
        aria-hidden='true'
        aria-label='Toggle Menu'
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <TrayIcon /> : <TrayFillIcon />}
      </button>

      <ul css={[Styles.list, isOpen && Styles.listOpened]}>
        <li>
          <Button type='button' onClick={() => router.push('/login')}>
            Log in
          </Button>
        </li>
        <li>
          <Button color='primary' type='button' onClick={() => router.push('/signup')}>
            Sign up
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNavigation
