import React from 'react'
import Styles from '@/styles/header-navigation.style'
import { useRouter } from 'next/router'

const HeaderNavigation = () => {
  const router = useRouter()

  return (
    <nav css={Styles.root}>
      <ul>
        <li>
          <button type='button' onClick={() => router.push('/login')}>
            Log in
          </button>
        </li>
        <li>
          <button type='button' onClick={() => router.push('/signup')}>
            Sign up
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNavigation
