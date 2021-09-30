import React, { useState } from 'react'
import { IoCameraReverse } from 'react-icons/io5'
import Modal from '@/components/Modal'
import FileDropzone from '@/components/FileDropzone'
import ImageCropper from '@/components/ImageCropper'
import Styles from '@/styles/set-avatar.style'
import Avatar from '@/styles/styled-components/avatar.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'

type Props = {
  source?: string
}

const SetAvatar: React.FC<Props> = ({ source }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | undefined>()

  return (
    <>
      <div css={Styles.root}>
        <Avatar css={Styles.image} src={source} onClick={() => setIsOpenModal(true)} />

        <div css={Styles.editIconWrapper}>
          <IoCameraReverse css={Styles.editIcon} />
        </div>
      </div>

      {/* ファイルの選択/トリミングをするモーダル */}
      {isOpenModal && (
        <Modal closeAction={() => setIsOpenModal(false)}>
          {/* ファイル未選択の場合のみ、ファイル選択が可能 */}
          {!selectedFile && <FileDropzone dropAction={(file) => setSelectedFile(file)} />}

          {selectedFile && (
            <>
              <ImageCropper imageSource={URL.createObjectURL(selectedFile)} aspect={1} isCropRoundShape={true} />
              <FormActions>
                <Button type='button' color='gray' onClick={() => setSelectedFile(undefined)}>
                  Clear
                </Button>
                <Button type='button' color='primary' onClick={() => console.log(selectedFile)}>
                  OK
                </Button>
              </FormActions>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default SetAvatar
