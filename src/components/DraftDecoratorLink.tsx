import React from 'react'

const DraftDecoratorLink = ({ ...props }) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  if (!url) return null
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' aria-label={url}>
      {props.children}
    </a>
  )
}

export default DraftDecoratorLink
