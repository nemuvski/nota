import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { IoFileTrayOutline, IoFileTrayFullOutline } from 'react-icons/io5'
import Styles from '@/styles/header-navigation.style'
import Button from '@/styles/button.component'
import { useLoginState } from '@/hooks/auth'

const HeaderNavigation = () => {
  const router = useRouter()
  const { isLogin } = useLoginState()
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
        {isOpen ? <IoFileTrayOutline /> : <IoFileTrayFullOutline />}
      </button>

      <ul css={[Styles.list, isOpen && Styles.listOpened]}>
        {!isLogin ? (
          <>
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
          </>
        ) : (
          <>
            <li>
              <Button type='button' onClick={() => router.push('/dashboard')}>
                Dashboard
              </Button>
            </li>
            <li>
              <Button type='button' onClick={() => router.push('/settings')}>
                Settings
              </Button>
            </li>
            <li>
              <Button type='button' onClick={() => router.push('/logout')}>
                Log out
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default HeaderNavigation
