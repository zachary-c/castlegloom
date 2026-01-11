
export const theme_list = [
	'monthly',
	'december-light',
	'november-light',
	'january-light',
	'wireframe-dark',
	/*'october-dark',
	'october-light',
	'wireframe',
	'december-dark',
	'february-light',
	'march-light',
	'march-dark',
	'april-light',
	'may-dark',
	'june-light',
	'july-light',
	'august-dark',
	'september-light'*/
]

export type PreferenceTheme = 'monthly' | 'december-light' | 'november-light' | 'january-light'

export type Theme = 'november-light' | 'october-dark' | 'october-light' | 'wireframe-dark' | 'january-light' | 'december-light' | 'december-dark' | 'february-light' | 'march-light' | 'march-dark' | 'april-light' | 'may-dark' | 'june-light' | 'july-light' | 'august-dark' | 'september-light'

export const monthly_theme: Theme = 'january-light'

export function concreteTheme(theme: PreferenceTheme | undefined): Theme {
	if (!theme || theme === 'monthly') {
		return monthly_theme;
	} else {
		return theme
	}
}

export const STANDARDS = {
	white: '#fff',
	black: '#000',
	darkgray: '#555',
	hyperlinkBlue: "#0000EE"
}
export const THEME_NOVEMBER = {
	thanksgivingBrown: "rgb(114, 51, 17)",
	thursdayOchre: "rgb(161, 73, 18)",
	novemberTan: "rgb(255, 236, 188)",
	ghostOfOctober: "rgb(255, 255, 228)",
	charcoalCemetery: "rgb(59, 59, 59)",
}
export const THEME_DECEMBER = {
	snowWhite: "#f2f2f2",
	firGreen: "#01440f",
	treeTrimming: "#00b409",
	nightSkies: "#404343",
	santaRed: "#840000",
	rudolphNose: "#c51d1d"
}
// January Theme Colors
export const THEME_JAN = {
	walnutBrown: "#5c574f",
	blackOlive: "#48483a",
	jasper: "#d66853",
	bone: "#d1d3c4",
	platinum: "#dfe0dc",
}

export const THEME_FEB_LIGHT = {
	blush: '#db5375',
	snow: '#f7f0f0',
	electricBlue: '#8af3ff',
	chefchaouenBlue: '#3f8efc',
	prussianBlue: `#0b3142`,
	uranianBlue: '#b1ddf2'
}
export const THEME_MARCH_LIGHT = {
	springGreen: '#92e464',
	bakerMiller: '#fa91b2',
	columbiaBlue: '#c4d1d7',
	officeGreen: '#276904',
	lapisLazuli: `#1f6898`,
	kellyGreen: '#40a505'
}
export const THEME_APRIL_LIGHT = {
	periwinkle: "#B7B1F2",
	lavenderPink: "#fdb7ea",
	paleDogwood: "#ffdccc",
	vanillaIce: "#fbf3b9",
	lightGreen: "#B4FFAB",
	paynesGray: '#536271',
	robinsEgg: '#1ae3e3'
}
export const THEME_MAY_DARK = {
	bittersweet: "#ff5e5b",
	mistyRose: "#f1dede",
	claret: "#6e0d25",
	saffron: "#f9c22e",
	charcoal: "#424c55",
}
export const THEME_JUNE_LIGHT = {
	icterine: "#FFFA71",
	airSuperiority: "#4DA5E0",
	earthYellow: "#FFAE36",
	flame: "#DD6031",
	blackOlive2: "#2E382E",
}
export const THEME_JULY_LIGHT = {
	americanBlue: "#19549C",
	fireEngineRed: "#D01827",
	darkOrange: "#F58F29",
	battleshipGrey: "#818479",
	white: "#fff",
	strawberryRed: '#e55151'
}
export const THEME_AUGUST_DARK = {
	body: "#510C0C",
	pageTitle: "#FFFFFF",
	header: "#58420b",
	pollBackground: "#950006",
	optionsItem: "#FFBF1E",
	optionsItemFillBar: "#84BF43",
	optionsItemText: "#FFFFFF",
	optionsItemCount: "#FFFFFF",
	buttonSignup: "#950006;"
}
export const THEME_SEPTEMBER_LIGHT = {
	cerulean: "#146D93",
	munsellBlue: "#3B8EA5",
	celadon: "#aef6c7",
	atomicTangerine: "#FF8B55",
	burgundy: "#880000",
	pakistanGreen: "#0C3900"
}
export const THEME_OCTOBER_DARK = {
	charcoalMining: "rgb(59, 59, 59)",
	grayLeiter: "rgb(75, 75, 75)",
	pumpkinOrange: "#ffbf00",
	ashenCue: "rgb(100, 100, 100)",
	transparent1: "hsla(0, 0%, 100%, .655)",
	transparent2: "hsla(0, 0%, 100%, .96)",
	slaightGrey: "#abb9c7"
}

export const emailFrom = `Castle Gloom Census <${process.env.ORACLE_LOGIN}>`
export const emailToForBCC = `Citizenry <${process.env.ORACLE_LOGIN}>`

export function randomInRange(min: number, max: number) {
	return Math.floor(Math.random() * max) + min;
}
export const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
