import { defineType } from "sanity";

export default defineType({
    name: 'meme',
    type: 'document',
    title: 'Memes',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
            },
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
        {
            name: 'mainImage',
            type: 'image',
            title: 'Main image'
        },
        {
            name: 'video',
            type: 'file',
            title: 'Video'
        },
        {
            name: 'videoType',
            type: 'string',
            title: 'Video Type',
            options: {
                list: [
                    {title: 'MP4', value: 'video/mp4'},
                    {title: 'OGG', value: 'video/ogg'},
                    {title: 'WebM', value: 'video/webm'}
                ]
            }
        },
        {
            name: 'youtubeURL',
            type: 'url',
            title: 'Youtube URL'
        },
        {
            title: 'Poll Question',
            type: 'reference',
            to: [{ type: 'pollQuestion'}],
            name: 'question',
        }
    ],
    orderings: [
        {
            title: 'Date Order',
            name: 'dateOrder',
            by: [
                {field: 'date', direction: 'desc'}
            ]
        }
    ]
})