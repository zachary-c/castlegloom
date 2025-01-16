import { type SchemaTypeDefinition } from 'sanity'
import page from './page'
import meme from './meme'
import recipient from './recipient'
import sound from './sound'
import soundPreset from './soundPreset'
import pollQuestion from './pollQuestion'
import pollResponse from './pollResponse'
import bingoCard from './bingoCard'
import bingoSquare from './bingoSquare'
import bingoSupport from './bingoSupport'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page, 
    meme,
    recipient,
    sound,
    soundPreset,

    pollQuestion,
    pollResponse,

    bingoCard,
    bingoSquare,
    bingoSupport
  ],
}
