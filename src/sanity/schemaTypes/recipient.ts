export default {
    name: 'recipient',
    title: 'Recipients',
    type: 'document',
    fields: [
        {
            name: 'email',
            title: 'Email',
            type: 'email'
        },
        {
            name: 'receiveOther',
            title: 'Receive Other Emails',
            type: 'boolean'
        }
    ],
    preview: {
        select: {
            title: 'email'
        }
    }
}