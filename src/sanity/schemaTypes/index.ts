import { type SchemaTypeDefinition } from 'sanity'
import page from './page'
import meme from './meme'
import recipient from './recipient'
import sound from './sound'
import soundPreset from './soundPreset'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page, 
    meme,
    recipient,
    sound,
    soundPreset
  ],
}
