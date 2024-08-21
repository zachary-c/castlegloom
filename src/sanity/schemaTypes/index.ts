import { type SchemaTypeDefinition } from 'sanity'
import page from './page'
import meme from './meme'
import recipient from './recipient'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page, 
    meme,
    recipient,
  ],
}
