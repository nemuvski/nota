import React, { useCallback, useState } from 'react'
import { Editor, EditorState, DraftEditorCommand, DraftHandleValue, convertToRaw, RichUtils } from 'draft-js'
import Styles from '@/styles/rich-text-editor.style'
import Button from '@/styles/styled-components/button.component'

const RichTextEditor = ({ ...props }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleEditorStateChange = useCallback(
    (changedEditorState: EditorState) => {
      setEditorState(changedEditorState)
      // 変更内容を変換したものを渡す
      props.onChange(convertToRaw(changedEditorState.getCurrentContent()))
    },
    [props]
  )

  // キーコマンドでの装飾のハンドラー
  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, changedEditorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(changedEditorState, command)
      if (newState) {
        handleEditorStateChange(newState)
        return 'handled'
      }
      return 'not-handled'
    },
    [handleEditorStateChange]
  )

  return (
    <div css={Styles.root}>
      <ul css={Styles.actions}>
        <li>
          <Button
            type='button'
            color='gray'
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
            }}
          >
            U
          </Button>
        </li>
        <li>
          <Button
            type='button'
            color='gray'
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
            }}
          >
            B
          </Button>
        </li>
        <li>
          <Button
            type='button'
            color='gray'
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
            }}
          >
            I
          </Button>
        </li>
      </ul>
      <div css={[Styles.editor, Styles.draftEditorStyles]}>
        <Editor editorState={editorState} onChange={handleEditorStateChange} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  )
}

export default RichTextEditor
