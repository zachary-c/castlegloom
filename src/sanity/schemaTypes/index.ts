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
import rwbbRecord from './rwbbRecord'
import questionPrompt from './questionObjects/questionPrompt'
import edict from './edict'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		page,
		meme,
		recipient,
		sound,
		soundPreset,

		rwbbRecord,

		pollQuestion,
		pollResponse,
		questionPrompt,

		edict,

		bingoCard,
		bingoSquare,
		bingoSupport
	],
}
