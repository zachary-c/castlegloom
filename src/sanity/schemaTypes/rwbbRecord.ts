import { defineField, defineType } from "sanity";

export default defineType({
    name: 'rwbbRecord',
    title: 'RWBB Record',
    type: 'document',
    fields: [
        defineField({
            name: 'username',
            title: 'Username',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        }),
        {
            name: 'count',
            title: 'Count',
            type: 'number',
            validation: (Rule : any) => Rule.required()
        },
    ],
})