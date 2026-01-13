import { SanityReference } from "next-sanity";
import { defineField, defineType, ImageAsset } from "sanity";
import { ImageAlt } from "../imageAlt";

export default defineType({
	name: 'qpImage',
	title: 'Image',
	type: 'object',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'imageAlt',
		}),
	],
	preview: {
		select: {
			media: 'image?.asset'
		},
		prepare: (ctx) => {
			return {
				title: 'Image',
				media: ctx.media
			}
		}
	}
})

export type qpImage = {
	image: ImageAlt
}
