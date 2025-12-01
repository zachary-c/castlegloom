import { defineType, PortableTextBlock } from "sanity";

export default defineType({
	name: 'edict',
	type: 'document',
	title: 'Edict',
	fields: [
		{
			name: "edictHeading",
			type: "string",
			title: "Edict Heading",
		},
		{
			title: "Slug",
			name: "slug",
			type: "slug",
			options: {
				source: 'edictHeading',
			},
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
			title: "Number",
			name: "edictNumber",
			type: "number",
		},
		{
			name: "edictBody",
			type: 'array',
			of: [{
				type: "block",
				styles: [
					{ title: "Heading 2", value: "h2" },
					{ title: "Heading 3", value: "h3" },
					{ title: "Heading 4", value: "h4" },
					{ title: "Blockquote", value: "blockquote" }
				],
			}],
			title: "Edict Body",
		},
		{
			title: "Colorscheme",
			name: "colorscheme",
			type: "string",
			options: {
				list: [
					{ title: "December", value: "december-light" },
					{ title: "Standards", value: "standards (default)" },
				]
			}
		}
	]
});

export type KingsEdict_t = {
	edict_number: number
	edictBody: PortableTextBlock[]
	date: string
	edictHeading: string
	colorscheme: 'december-light' | 'standards (default)'
}
