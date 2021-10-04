import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { RawDraftContentState } from 'draft-js'
import { MAX_LENGTH_TITLE } from '@/constants/article'
import Message from '@/components/Message'
import RichTextEditor from '@/components/RichTextEditor'
import { MessageContent } from '@/models/Message'
import FormField from '@/styles/styled-components/form-field.component'
import Button from '@/styles/styled-components/button.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import InputText from '@/styles/styled-components/input-text.component'

type FormFields = {
  title: string
  body: RawDraftContentState
}

const ArticleForm: React.FC = () => {
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
      title: '',
      // TODO: 編集時にbodyの初期値を指定
    },
  })

  /**
   * Saveボタン押下イベント
   *
   * @param formFields
   */
  const submit = async (formFields: FormFields) => {
    console.log(formFields)
    // TODO: 登録処理
    setMessageContent({ level: 'warning', content: 'now under construction' })
  }

  return (
    <>
      {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

      <form onSubmit={handleSubmit(submit)}>
        <FormField>
          <label>Title</label>
          <InputText
            isError={Boolean(errors.title)}
            type='text'
            maxLength={MAX_LENGTH_TITLE}
            {...register('title', { required: true, maxLength: MAX_LENGTH_TITLE })}
          />
        </FormField>

        <FormField>
          <label>Body</label>
          <Controller
            control={control}
            name='body'
            render={({ field: { onChange } }) => <RichTextEditor onChange={onChange} />}
          />
        </FormField>

        <FormActions>
          <Button type='button' color='gray' disabled={isSubmitting} onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
            Save
          </Button>
        </FormActions>
      </form>
    </>
  )
}

export default ArticleForm
