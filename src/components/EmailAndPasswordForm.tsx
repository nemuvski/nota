import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Styles from '@/styles/email-and-password-form.style'
import Button from '@/styles/button.component'
import { MIN_LENGTH_PASSWORD } from '@/constants/form'
import InputText from '@/styles/input-text.component'
import Box from '@/styles/box.component'
import InputPassword from '@/components/InputPassword'
import Message from '@/components/Message'
import { logIn, sendEmailAddressVerification, signUp } from '@/infrastructure/auth'

type Props = {
  isSignUpMode?: boolean
}

type FormFields = {
  email: string
  password: string
}

const EmailAndPasswordForm: React.FC<Props> = ({ isSignUpMode = false }) => {
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * ボタン押下イベント
   *
   * @param formFields
   */
  const submit = async (formFields: FormFields) => {
    const { email, password } = formFields
    try {
      setMessageContent(null)
      if (isSignUpMode) {
        const userCredential = await signUp(email, password)
        await sendEmailAddressVerification(userCredential.user)
      } else {
        await logIn(email, password)
      }
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Box>
      {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

      <form onSubmit={handleSubmit(submit)}>
        <div css={Styles.field}>
          <label>Email address</label>
          <InputText isError={Boolean(errors.email)} type='email' {...register('email', { required: true })} />
        </div>
        <div css={Styles.field}>
          <label>Password</label>
          <Controller
            control={control}
            name='password'
            rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
            render={({ field: { onChange, value } }) => (
              <InputPassword isError={Boolean(errors.password)} onChange={onChange} value={value} />
            )}
          />
        </div>
        <div css={Styles.actions}>
          <Button
            type='submit'
            color='primary'
            disabled={Boolean(errors.email) || Boolean(errors.password) || isSubmitting}
          >
            {isSignUpMode ? 'Sign up' : 'Log in'}
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default EmailAndPasswordForm
