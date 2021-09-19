import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Styles from '@/styles/email-and-password-form.style'
import Button from '@/styles/button.component'
import { MIN_LENGTH_PASSWORD } from '@/constants/form'
import InputText from '@/styles/input-text.component'
import InputPassword from '@/components/InputPassword'
import Message from '@/components/Message'
import { logIn, signUp } from '@/infrastructure/auth'

type Props = {
  isSignUpMode?: boolean
}

type FormFields = {
  email: string
  password: string
}

const EmailAndPasswordForm: React.FC<Props> = ({ isSignUpMode = false }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
      setErrorMessage(null)
      isSignUpMode ? await signUp(email, password) : await logIn(email, password)
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <form css={Styles.root} onSubmit={handleSubmit(submit)}>
      {errorMessage && <Message level='error'>{errorMessage}</Message>}

      <div css={Styles.field}>
        <label css={Styles.fieldLabel}>Email</label>
        <InputText
          css={[Styles.fieldInput, errors.email && Styles.fieldInputError]}
          type='email'
          {...register('email', { required: true })}
        />
      </div>
      <div css={Styles.field}>
        <label css={Styles.fieldLabel}>Password</label>
        <Controller
          control={control}
          name='password'
          rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
          render={({ field: { onChange, value } }) => (
            <InputPassword
              css={[Styles.fieldInput, errors.password && Styles.fieldInputError]}
              onChange={onChange}
              value={value}
            />
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
  )
}

export default EmailAndPasswordForm
