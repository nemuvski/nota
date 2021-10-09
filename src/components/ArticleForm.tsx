import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { RawDraftContentState } from 'draft-js'
import { INITIAL_BODY_CONTENT, MAX_LENGTH_TITLE } from '@/constants/article'
import { Article } from '@/models/Article'
import { MessageContent } from '@/models/Message'
import Message from '@/components/Message'
import RichTextEditor from '@/components/RichTextEditor'
import SetThumbnail from '@/components/SetThumbnail'
import FormField from '@/styles/styled-components/form-field.component'
import Button from '@/styles/styled-components/button.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import InputText from '@/styles/styled-components/input-text.component'

type Props = {
  article?: Article
}

type FormFields = {
  title: string
  body: RawDraftContentState
}

const ArticleForm: React.FC<Props> = ({ article }) => {
  const router = useRouter()
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)
  const [uploadingImage, setUploadingImage] = useState<Blob | undefined>(undefined)

  const initialBodyContent = useMemo(() => (article ? article.body : INITIAL_BODY_CONTENT), [article])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: article ? article.title : '',
      body: initialBodyContent,
    },
  })

  /**
   * Saveボタン押下イベント
   *
   * @param formFields
   * @param isDraft
   */
  const submit = async (formFields: FormFields, isDraft: boolean) => {
    console.log(isDraft ? 'DRAFT' : 'PUBLISH')
    // コンポーネントプロパティのarticleがある場合は編集モード
    if (article) {
      console.log('EDIT', formFields)
    } else {
      console.log('CREATE', formFields)
    }
    setMessageContent({ level: 'warning', content: 'now under construction' })
  }

  return (
    <>
      {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

      <form onSubmit={(e) => e.preventDefault()}>
        <FormField>
          <label>Thumbnail Image</label>
          <SetThumbnail
            thumbnailUrl={article?.thumbnailUrl}
            uploadingImageData={uploadingImage}
            setUploadingImageData={(data) => setUploadingImage(data)}
          />
        </FormField>

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
            render={({ field: { onChange } }) => (
              <RichTextEditor initialContent={initialBodyContent} onChange={onChange} />
            )}
          />
        </FormField>

        <FormActions>
          <Button type='button' color='gray' disabled={isSubmitting} onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button
            type='button'
            color='gray'
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit((formFields) => submit(formFields, true))}
          >
            Save as Draft
          </Button>
          <Button
            type='button'
            color='primary'
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit((formFields) => submit(formFields, false))}
          >
            Save & Publish
          </Button>
        </FormActions>
      </form>
    </>
  )
}

export default ArticleForm
