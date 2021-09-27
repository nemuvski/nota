import React, { useState } from 'react'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { useLoginState } from '@/hooks/auth'
import { sendEmailAddressVerification } from '@/infrastructure/auth'
import Message from '@/components/Message'
import Styles from '@/styles/email-verify-message.style'

const EmailVerifyMessage = () => {
  const { auth } = useLoginState()
  const [isSent, setIsSent] = useState(false)

  // メールアドレスの確認がされていない場合にのみ表示される
  if (auth && auth.emailVerified) return null

  /**
   * メールアドレスの確認メールを送信する
   */
  const sendEmail = async () => {
    try {
      await sendEmailAddressVerification()
      setIsSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Message level='warning'>
      <div css={Styles.content}>
        <span>Please complete your email address verification</span>
        <button css={Styles.button} type='button' onClick={() => sendEmail()} disabled={isSent}>
          <div css={Styles.buttonIcon}>
            <IoPaperPlaneOutline />
          </div>
          <span>Send</span>
        </button>
      </div>
    </Message>
  )
}

export default EmailVerifyMessage
