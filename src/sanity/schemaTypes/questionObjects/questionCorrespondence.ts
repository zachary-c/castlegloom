import { ResponseImage_t, ResponseRichText_t } from "$/types/documents";
import { defineType } from "sanity";

export default defineType({
	name: 'questionCorrespondence',
	type: 'object',
	title: 'Correspondence',
	fields: [
		{
			name: 'correspondenceType',
			type: 'string',
			title: 'Type',
			options: {
				list: [
					{ value: "richTextResponse", title: "Rich Text Response" },
					{ value: "imageResponse", title: "Image Response" },
					{ value: "noResponse", title: "No Response" },
					// { value: "freeResponse", title: "Free Response" },
				]
			},
			initialValue: "richTextResponse"
		},
		{
			name: 'richTextResponses',
			type: 'array',
			of: [{ type: 'responseRichText' }],
			hidden: (ctx) => (ctx.document?.correspondence as QuestionCorrespondence_t)?.correspondenceType !== "richTextResponse"
		},
		{
			name: 'imageResponses',
			type: 'array',
			of: [{ type: 'responseImage' }],
			hidden: (ctx) => (ctx.document?.correspondence as QuestionCorrespondence_t)?.correspondenceType !== "imageResponse"
		},
	],
})

export type QuestionCorrespondence_t = {
	correspondenceType: "richTextResponse",
	richTextResponses?: ResponseRichText_t[]
} | {
	correspondenceType: "imageResponse",
	imageResponses?: ResponseImage_t[]
}

