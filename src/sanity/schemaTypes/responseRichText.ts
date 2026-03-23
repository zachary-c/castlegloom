import { toPlainText } from "next-sanity";
import { defineType } from "sanity";

export default defineType({
	name: 'responseRichText',
	type: 'object',
	title: 'Rich Text Response',
	fields: [
		{
			name: 'content',
			title: 'Response',
			type: 'array',
			of: [{
				type: "block",
				styles: [],
				lists: [],
				marks: {
					annotations: []
				}
			}]
		},
		{
			name: 'responseSlug',
			type: 'slug',
		},
		{
			name: 'listOfResponders',
			type: 'array',
			of: [
				{ type: 'reference', to: [{ type: 'recipient' }] }
			],
		}
	],
	preview: {
		select: {
			portableTextContent: 'content',
			responseSlug: 'responseSlug',
			listOfResponders: 'listOfResponders',
		},
		prepare: (e: any) => {
			return {
				title: `${e.responseSlug?.current ?? ''} | ${toPlainText(e.portableTextContent ?? [])}`,
				subtitle: `Votes: ${e.listOfResponders?.length ?? '0'}`,
			}
		}
	}
})

