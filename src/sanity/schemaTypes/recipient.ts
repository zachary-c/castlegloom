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
        },
        {
            name: 'isPolledDaily',
            title: 'Is Polled Daily?',
            type: 'boolean',
            default: false
        }
    ],
    preview: {
        select: {
            title: 'email'
        }
    }
}