import { CompositeDecorator, RawDraftContentState, convertFromRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import DraftDecoratorLink from '@/components/DraftDecoratorLink'
import React from 'react'

export const CustomDecorator = new CompositeDecorator([
  {
    strategy: (block, callback, contentState) => {
      block.findEntityRanges((characterMetadata) => {
        const entityKey = characterMetadata.getEntity()
        return Boolean(entityKey) && contentState.getEntity(entityKey).getType() === 'LINK'
      }, callback)
    },
    component: DraftDecoratorLink,
  },
])

export const convertToHTMLFromRaw = (rawState: RawDraftContentState) => {
  const contentState = convertFromRaw(rawState)
  return convertToHTML({
    styleToHTML: (style) => {
      if (style === 'STRIKETHROUGH') {
        return <del />
      }
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return (
          <a href={entity.data.url} target='_blank' rel='noopener noreferrer' aria-label={entity.data.url}>
            {originalText}
          </a>
        )
      }
    },
  })(contentState)
}
