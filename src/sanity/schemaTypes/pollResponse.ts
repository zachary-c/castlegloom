import { defineType } from "sanity";

export default defineType({
    name: 'pollResponse',
    type: 'object',
    title: 'Poll Response',
    fields: [
        {
            name: 'responseText',
            type: 'string',
            title: 'Response Text'
        },
        {
            name: 'responseSlug',
            type: 'slug',
            options: {
                source: 'pollResponse.responseText',
            },
        },
        {
            name: 'listOfResponders',
            type: 'array',
            of: [
                { type: 'reference', to: [{type: 'recipient'}] }
            ],
        }        
    ],
    preview: {
        select: {
            responseText: 'responseText',
            responseSlug: 'responseSlug'
        },
        prepare: (e : any) => {
            return {
                title: e.responseText,
                subtitle: e.responseSlug?.current ?? ''
            }
        }
    }

})