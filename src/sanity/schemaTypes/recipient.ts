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
        },
        {
            name: "showNamePublically",
            title: "Show name on leaderboard?",
            type: "boolean",
            default: false
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            type: 'object',
            name: 'title',
            fields: [
                {
                    name: 'profession',
                    title: "Profession",
                    type: 'string'
                },
                {
                    name: 'qualifier',
                    title: "Qualifier",
                    type: 'string'
                }
            ]
        },
        {
            name: "timesLoggedIn",
            title: "Times Logged In",
            type: "number"
        }
    ],
    preview: {
        select: {
            title: 'email'
        }
    }
}