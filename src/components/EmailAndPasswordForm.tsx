import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { addAccountAction } from '@/stores/account/action'
import { MessageContent } from '@/models/Message'
import { MIN_LENGTH_PASSWORD } from '@/constants/form'
import { logIn, sendEmailAddressVerification, signUp } from '@/infrastructure/auth'
import InputPassword from '@/components/InputPassword'
import Message from '@/components/Message'
import Button from '@/styles/styled-components/button.component'
import InputText from '@/styles/styled-components/input-text.component'
import Box from '@/styles/styled-components/box.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import FormField from '@/styles/styled-components/form-field.component'

type Props = {
  isSignUpMode?: boolean
}

type FormFields = {
  email: string
  password: string
}

const EmailAndPasswordForm: React.FC<Props> = ({ isSignUpMode = false }) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
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
        // 新規登録
        const userCredential = await signUp(email, password)
        // メールアドレスの確認メール
        await sendEmailAddressVerification()
        // Accountドキュメントを追加
        await dispatch(addAccountAction(userCredential.user.uid)).unwrap()
      } else {
        // ログイン
        await logIn(email, password)
      }

      // ログイン後はダッシュボードページに遷移
      router.push('/dashboard')
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Box>
      {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

      <form onSubmit={handleSubmit(submit)}>
        <FormField>
          <label>Email address</label>
          <InputText isError={Boolean(errors.email)} type='email' {...register('email', { required: true })} />
        </FormField>

        <FormField>
          <label>Password</label>
          <Controller
            control={control}
            name='password'
            rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
            render={({ field: { onChange, value } }) => (
              <InputPassword isError={Boolean(errors.password)} onChange={onChange} value={value} />
            )}
          />
        </FormField>

        <FormActions>
          <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
            {isSignUpMode ? 'Sign up' : 'Log in'}
          </Button>
        </FormActions>
      </form>
    </Box>
  )
}

export default EmailAndPasswordForm
