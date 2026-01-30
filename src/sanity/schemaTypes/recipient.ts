export default {
	name: 'recipient',
	title: 'Recipients',
	type: 'document',
	groups: [
		{ name: "meta", title: "Meta" },
		{ name: "preferences", title: "Preferences" }
	],
	fields: [
		{
			name: 'email',
			title: 'Email',
			type: 'email',
			group: "preferences"
		},
		{
			name: 'isPolledDaily',
			title: 'Is Polled Daily?',
			type: 'boolean',
			default: false,
			group: 'preferences'
		},
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			group: "preferences"
		},
		{
			name: 'theme',
			title: 'Theme',
			type: 'string',
			group: "preferences",
			options: {
				list: [
					{ title: "Monthly", value: "monthly" },
					{ title: "December Light", value: "december-light" },
					{ title: "November Light", value: "november-light" },
					{ title: "January Light", value: "january-light" },
					{ title: "February Light", value: "february-light" },
					{ title: "Wireframe (Dark)", value: "wireframe-dark" },
				]
			}
		},
		{
			type: 'object',
			name: 'title',
			group: "preferences",
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
			type: "number",
			group: 'meta'
		},
		{
			name: "color",
			title: "Color",
			type: "string",
			group: 'meta',
			options: {
				columns: 1
			}
		},
		{
			name: "backgroundColor",
			title: "Background Color",
			type: "string",
			group: 'meta',
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
