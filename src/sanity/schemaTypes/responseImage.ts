import { defineType } from "sanity";

export default defineType({
	name: 'responseImage',
	type: 'object',
	title: 'Image Response',
	fields: [
		{
			name: 'img',
			type: 'imageAlt',
			title: 'Response Image',
		},
		{
			name: "hoverTitle",
			title: "Hover Title",
			type: "string"
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
			hoverTitle: 'hoverTitle',
			responseSlug: 'responseSlug',
			listOfResponders: 'listOfResponders',
			img: "img"
		},
		prepare: (e: any) => {
			return {
				title: `${e.hoverTitle ?? ''} | ${e.responseSlug?.current}`,
				subtitle: `Votes: ${e.listOfResponders?.length ?? '0'}`,
				media: e.img?.image?.asset
			}
		}
	}
})

