import { defineField, defineType, PortableTextBlock } from "sanity";

// Eventually, it'd be nice to migrate all the old questions (whose question text is plaintext in a field directly on the pollQuestion)
// to "plaintext" of these. That'd be a fun migration script to write.
export default defineType({
    name: 'questionPrompt',
    type: 'object',
    fields: [
        defineField({
            name: 'promptType',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    {title: "Plaintext", value: "plainText"},
                    {title: "Rich Text", value: "richText"},
                ]
            }
        }),
        defineField({
            name: 'richTextPrompt',
            title: 'Rich Text Prompt',
            type: 'array',
            of: [{
                type: "block",
                // No styles please; defaults to including h1-h6 and blockquote, but we just want the one
                // default normal style
                styles: [],
                // don't need lists 
                lists: [],  
            }],
            hidden: (ctx) => ctx.parent?.promptType !== "richText",
        }),
        defineField({
            name: 'plaintextQuestionPrompt',
            type: 'string',
            title: "Plaintext Question Prompt",
            hidden: (ctx) => ctx.parent?.promptType !== "plainText",
        })
    ],
})

/**
 * The "|" operator is a logic OR, union. QuestionPrompt_t is either an object with a 
 * type: "plainText" and a plaintextQuestionPrompt field, OR an object with type: "richText". In the schema,
 * we only show the user the fields based off type. In the frontend, typescript is smart enough such that if
 * we check if type == "plainText", it can infer that we're in the first type and not the second, and will 
 * use just the first type's fields for typesafety.
 */
type QuestionPrompt_t = {
    type : "plainText",
    plaintextQuestionPrompt : string
} | {
    type : "richText",
    richTextPrompt : PortableTextBlock[]
}