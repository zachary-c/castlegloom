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
		},
		{
			name: "color",
			title: "Color",
			type: "string",
			options: {
				columns: 1
			}
		},
		{
			name: "backgroundColor",
			title: "Background Color",
			type: "string",
			options: {
				columns: 1
			}
		}
	],
	preview: {
		select: {
			profession: "title.profession",
			qualifier: "title.qualifier",
			email: 'email'
		},
		prepare: (data: any) => {
			if (data.profession) {
				return {
					title: data.profession + " " + data.qualifier,
					subtitle: data.email
				}
			} else {
				return { title: data.email }

			}
		}
	}
}
