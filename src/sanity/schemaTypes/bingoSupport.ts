import { defineField, defineType } from "sanity";

export default defineType({
    name: 'bingoSupport',
    title: 'Bingo Support',
    type: 'object',
    fields: [
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image'
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date'
        }),
    ],
})