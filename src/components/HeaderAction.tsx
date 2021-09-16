import React from 'react'
import Link from 'next/link'

const HeaderAction = () => {
  return (
    <div>
      <Link href='/sign-in'>
        <a>Sign in</a>
      </Link>
    </div>
  )
}

export default HeaderAction
