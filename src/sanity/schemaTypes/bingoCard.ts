import { defineField, defineType } from "sanity";

export default defineType({
    name: 'bingoCard',
    title: 'Bingo Card',
    type: 'document',
    fields: [
        defineField({
            name: 'ownerName',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (Rule: any) => Rule.required(),
        }),
        {
            name: 'row1',
            title: 'Row 1',
            type: 'array',
            of: [
                { type: 'bingoSquare' }
            ],
        },
        {
            name: 'row2',
            title: 'Row 2',
            type: 'array',
            of: [
                { type: 'bingoSquare' }
            ],
        },
        {
            name: 'row3',
            title: 'Row 3',
            type: 'array',
            of: [
                { type: 'bingoSquare' }
            ],
        },
        {
            name: 'row4',
            title: 'Row 4',
            type: 'array',
            of: [
                { type: 'bingoSquare' }
            ],
        },
        {
            name: 'row5',
            title: 'Row 5',
            type: 'array',
            of: [
                { type: 'bingoSquare' }
            ],
        },
    ],
})