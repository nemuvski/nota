import React, { useCallback, useState } from 'react'
import {
  Editor,
  EditorState,
  DraftEditorCommand,
  DraftHandleValue,
  DraftBlockType,
  convertToRaw,
  RichUtils,
} from 'draft-js'
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsListUl,
  BsListOl,
} from 'react-icons/bs'
import { IoArrowUndoOutline, IoArrowRedoOutline, IoLinkOutline, IoUnlinkOutline } from 'react-icons/io5'
import { CustomDecorator } from '@/libs/draft-js'
import Styles from '@/styles/rich-text-editor.style'
import RichTextActionButton from '@/styles/styled-components/rich-text-action-button.component'

const RichTextEditor = ({ ...props }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty(CustomDecorator))

  /**
   * 変更反映用のハンドラー
   */
  const handleEditorStateChange = useCallback(
    (changedEditorState: EditorState) => {
      setEditorState(changedEditorState)
      // 変更内容を変換したものを渡す
      props.onChange(convertToRaw(changedEditorState.getCurrentContent()))
    },
    [props]
  )

  /**
   * キーコマンドでの装飾のハンドラー
   */
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

  /**
   * インラインスタイルの変更
   *
   * @param inlineStyle
   */
  const toggleInlineStyle = (inlineStyle: string) => {
    handleEditorStateChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  /**
   * ブロックタイプの変更
   *
   * @param blockType
   */
  const toggleBlockType = (blockType: DraftBlockType) => {
    handleEditorStateChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  /**
   * ハイパーリンクの付与/解除
   */
  const toggleLink = (isUnlink = false) => {
    const selection = editorState.getSelection()
    // 解除
    if (isUnlink) {
      handleEditorStateChange(RichUtils.toggleLink(editorState, selection, null))
    }
    // 付与
    else {
      const url = window.prompt('Enter the URL')
      if (url) {
        const currentContent = editorState.getCurrentContent()
        const contentState = currentContent.createEntity('LINK', 'MUTABLE', { url })
        const entityKey = contentState.getLastCreatedEntityKey()
        const newEditorState = EditorState.push(editorState, contentState, 'apply-entity')
        handleEditorStateChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
      }
    }
  }

  return (
    <div css={Styles.root}>
      {/* アクションボタン群 */}
      <ul css={Styles.actions}>
        <li>
          <RichTextActionButton
            disabled={!editorState.getUndoStack().size}
            onClick={() => handleEditorStateChange(EditorState.undo(editorState))}
          >
            <IoArrowUndoOutline />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton
            disabled={!editorState.getRedoStack().size}
            onClick={() => handleEditorStateChange(EditorState.redo(editorState))}
          >
            <IoArrowRedoOutline />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleInlineStyle('BOLD')}>
            <BsTypeBold />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleInlineStyle('ITALIC')}>
            <BsTypeItalic />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleInlineStyle('UNDERLINE')}>
            <BsTypeUnderline />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleInlineStyle('STRIKETHROUGH')}>
            <BsTypeStrikethrough />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleBlockType('header-one')}>
            <BsTypeH1 />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleBlockType('header-two')}>
            <BsTypeH2 />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleBlockType('header-three')}>
            <BsTypeH3 />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleBlockType('unordered-list-item')}>
            <BsListUl />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton onClick={() => toggleBlockType('ordered-list-item')}>
            <BsListOl />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton disabled={editorState.getSelection().isCollapsed()} onClick={() => toggleLink()}>
            <IoLinkOutline />
          </RichTextActionButton>
        </li>
        <li>
          <RichTextActionButton disabled={editorState.getSelection().isCollapsed()} onClick={() => toggleLink(true)}>
            <IoUnlinkOutline />
          </RichTextActionButton>
        </li>
      </ul>

      {/* 入力エリア */}
      <div css={[Styles.editor, Styles.draftEditorStyles]}>
        <Editor editorState={editorState} onChange={handleEditorStateChange} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  )
}

export default RichTextEditor
