import React, { useState } from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import Styles from '@/styles/rich-text-editor.style'

const RichTextEditor = ({ ...props }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleEditorStateChange = (changedEditorState: EditorState) => {
    setEditorState(changedEditorState)
    return props.onChange(convertToRaw(changedEditorState.getCurrentContent()))
  }

  return (
    <div css={Styles.root}>
      <div css={Styles.actions}>ACTIONS</div>
      <div css={Styles.editor}>
        <Editor editorState={editorState} onChange={handleEditorStateChange} />
      </div>
    </div>
  )
}

export default RichTextEditor
