import React, { useState } from 'react'
import Modal from '@/components/Modal'
import FileDropzone from '@/components/FileDropzone'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'

type Props = {
  closeAction: () => void
}

const SetAvatarModal: React.FC<Props> = ({ closeAction }) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>()

  return (
    <Modal closeAction={() => closeAction()}>
      {/* ファイル未選択の場合のみ、ファイル選択が可能 */}
      {!selectedFile && <FileDropzone dropAction={(file) => setSelectedFile(file)} />}

      {selectedFile && (
        <FormActions>
          <Button type='button' color='gray' onClick={() => setSelectedFile(undefined)}>
            Clear
          </Button>
          <Button type='button' color='primary' onClick={() => console.log(selectedFile)}>
            OK
          </Button>
        </FormActions>
      )}
    </Modal>
  )
}

export default SetAvatarModal
