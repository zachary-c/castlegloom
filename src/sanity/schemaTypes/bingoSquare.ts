import { defineField, defineType } from "sanity";

export default defineType({
    name: 'bingoSquare',
    title: 'Bingo Square',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'shortLabel',
            title: 'Short Label',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'threshold',
            title: 'Threshold',
            type: 'number'
        }),
        defineField({
            name: 'support',
            title: "Support",
            type: 'array',
            of: [{type: 'bingoSupport'}]
        })
    ],
})