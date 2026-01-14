import { SanityReference } from "next-sanity";
import { defineField, defineType } from "sanity";

export default defineType({
	name: 'imageAlt',
	title: 'Image + Alt Text',
	type: 'object',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'alt',
			title: 'Alt Text',
			type: 'string',
			validation: Rule => Rule.required()
		}),
	],
})

export type ImageAlt = {
	alt: string
	image: {
		asset: SanityReference
	}
}
