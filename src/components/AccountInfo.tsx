import React from 'react'
import { useAccount } from '@/hooks/account'
import Styles from '@/styles/account-info.style'
import Avatar from '@/styles/styled-components/avatar.component'

type Props = {
  uid: AuthUid
  isSmallSize?: boolean
}

const AccountInfo: React.FC<Props> = ({ uid, isSmallSize = false }) => {
  const { isFetching, account } = useAccount(uid)

  if (isFetching || !account) {
    return null
  }

  return (
    <div css={[Styles.root, isSmallSize && Styles.rootVariant]}>
      <Avatar css={[Styles.avatar, isSmallSize && Styles.avatarVariant]} src={account.avatarUrl} />
      <span css={[Styles.name, isSmallSize && Styles.nameVariant]}>{account.displayName}</span>
    </div>
  )
}

export default AccountInfo
