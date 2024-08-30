import { defineType } from "sanity";

export default defineType({
    name: 'sound',
    type: 'object',
    title: 'Sound',
    fields: [
        {
            name: 'soundfile',
            type: 'file',
            title: 'Sound File'
        }
    ],
})