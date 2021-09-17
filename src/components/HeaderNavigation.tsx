import React from 'react'
import { useRouter } from 'next/router'
import Styles from '@/styles/header-navigation.style'
import Button from '@/styles/button.component'

const HeaderNavigation = () => {
  const router = useRouter()

  return (
    <nav css={Styles.root}>
      <ul>
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
