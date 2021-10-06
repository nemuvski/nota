import { CompositeDecorator } from 'draft-js'
import DraftDecoratorLink from '@/components/DraftDecoratorLink'

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
