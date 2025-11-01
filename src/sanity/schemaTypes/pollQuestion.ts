import { PollResponse_t } from "$/types/documents";
import { defineType } from "sanity";

export default defineType({
	name: 'pollQuestion',
	type: 'document',
	title: 'Poll Question',
	fields: [
		{
			type: "questionPrompt",
			name: "prompt",
			title: "Question Prompt"
		},
		{
			name: 'title',
			type: 'string',
			title: 'Question Title'
		},
		{
			name: 'date',
			title: 'Date',
			type: 'date',
			initialValue: () => {
				const now = new Date();

				const month = now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
				const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

				return now.getFullYear() + '-' + month + '-' + day;
			},
		},
		{
			type: 'boolean',
			title: "Sent",
			name: 'hasBeenSent',
			initialValue: false
		},
		{
			name: 'responses',
			type: 'array',
			of: [{ type: 'pollResponse' }]
		},
		{
			name: "suggestedBy",
			title: "Question Suggested By",
			type: "reference",
			to: [{ type: "recipient" }]
		},
		{
			name: 'questionText',
			type: 'string',
			title: 'Question Text',
			deprecated: { reason: "Please use the question prompt system!" }
		},
	],
	orderings: [
		{
			title: 'Date Order',
			name: 'dateOrder',
			by: [
				{ field: 'date', direction: 'desc' }
			]
		}
	],
	preview: {
		select: {
			questionSlug: 'title',
			date: 'date',
			responses: 'responses'
		},
		prepare: (e: any) => {
			let responseCount = 0;
			e.responses?.forEach((r: PollResponse_t) => responseCount += r.listOfResponders?.length ?? 0)
			return {
				title: e.questionSlug,
				subtitle: `${e.date} | ${responseCount} responses`
			}
		}
	}
})
