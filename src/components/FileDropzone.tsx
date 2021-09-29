import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { ACCEPT_FILE_FORMAT, MAX_NUM_FILES, MAX_SIZE_FILE, MEGA_BYTES } from '@/constants/file'
import Styles from '@/styles/file-dropzone.style'

type Props = {
  dropAction: (file?: File) => void
}

const FileDropzone: React.FC<Props> = ({ dropAction }) => {
  const { isDragAccept, isDragReject, getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_NUM_FILES,
    multiple: MAX_NUM_FILES > 1,
    maxSize: MAX_SIZE_FILE,
    accept: ACCEPT_FILE_FORMAT,
    onDrop: (acceptedFiles: Array<File>) => dropAction(acceptedFiles.pop()),
  })

  const rootStyles = useMemo(() => {
    return [Styles.root, Styles.rootVariant(isDragAccept, isDragReject)]
  }, [isDragAccept, isDragReject])

  return (
    <div css={rootStyles} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {"Drag 'n' drop a file here, or click to select a file."}
        <br />
        {`PNG, JPEG (< ${MAX_SIZE_FILE / MEGA_BYTES}MB)`}
      </p>
    </div>
  )
}

export default FileDropzone
