import React, { useCallback, useState } from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import Styles from '@/styles/rich-text-editor.style'
import Button from '@/styles/styled-components/button.component'

const RichTextEditor = ({ ...props }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleEditorStateChange = useCallback(
    (changedEditorState: EditorState) => {
      setEditorState(changedEditorState)
      // 変更内容を変換したものを渡す
      return props.onChange(convertToRaw(changedEditorState.getCurrentContent()))
    },
    [props]
  )

  return (
    <div css={Styles.root}>
      <ul css={Styles.actions}>
        <li>
          <Button type='button' color='gray'>
            U
          </Button>
        </li>
        <li>
          <Button type='button' color='gray' title='bold'>
            B
          </Button>
        </li>
        <li>
          <Button type='button' color='gray' title='italic'>
            I
          </Button>
        </li>
      </ul>
      <div css={[Styles.editor, Styles.draftEditorStyles]}>
        <Editor editorState={editorState} onChange={handleEditorStateChange} />
      </div>
    </div>
  )
}

export default RichTextEditor
