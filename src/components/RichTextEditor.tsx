import React, { useCallback, useState } from 'react'
import { Editor, EditorState, DraftEditorCommand, DraftHandleValue, convertToRaw, RichUtils } from 'draft-js'
import { AiOutlineUnderline, AiOutlineBold, AiOutlineItalic } from 'react-icons/ai'
import Styles from '@/styles/rich-text-editor.style'
import RichTextActionButton from '@/styles/styled-components/rich-text-action-button.component'

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
          <RichTextActionButton
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
            }}
          >
            <AiOutlineUnderline />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
            }}
          >
            <AiOutlineBold />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton
            onClick={() => {
              handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
            }}
          >
            <AiOutlineItalic />
          </RichTextActionButton>
        </li>
      </ul>
      <div css={[Styles.editor, Styles.draftEditorStyles]}>
        <Editor editorState={editorState} onChange={handleEditorStateChange} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  )
}

export default RichTextEditor
