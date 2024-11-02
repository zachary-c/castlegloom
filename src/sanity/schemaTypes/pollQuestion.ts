import { defineType } from "sanity";

export default defineType({
    name: 'pollQuestion',
    type: 'document',
    title: 'Poll Question',
    fields: [
        {
            name: 'questionText',
            type: 'string',
            title: 'Question Text',
        },
        {
            name: 'title',
            type: 'string',
            title: 'Question Title',
            description: 'Not displayed to user',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            initialValue: () => {
                const now = new Date();

                const month = now.getMonth() < 9 ? `0${now.getMonth()+1}` : now.getMonth()+1;
                const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

                return now.getFullYear() + '-' + month + '-' + day;
            },
        },
        /* 
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            initialValue: () => {
                const now = new Date();

                const month = now.getMonth() < 9 ? `0${now.getMonth()+1}` : now.getMonth()+1;
                const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

                return now.getFullYear() + '-' + month + '-' + day;
            },
        }, */
        {
            name: 'responses',
            type: 'array',
            of: [{ type: 'pollResponse' }]
        }
    ],/* 
    orderings: [
        {
            title: 'Date Order',
            name: 'dateOrder',
            by: [
                {field: 'date', direction: 'desc'}
            ]
        }
    ], */
})