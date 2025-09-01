import { STANDARDS, Theme, THEME_APRIL_LIGHT, THEME_FEB_LIGHT, THEME_JAN, THEME_MARCH_LIGHT, THEME_MAY_DARK, THEME_JUNE_LIGHT, THEME_JULY_LIGHT, THEME_AUGUST_DARK, THEME_SEPTEMBER_LIGHT } from '@/poll/pollUtil';

export type ThemeObject = {
	backgroundColor: string
	headerTextColor: string
	questionTextColor: string
	itemDefaultColor: string
	itemHoverColor: string
	itemTextColor: string
	itemAdditionalStyles?: string
	borderColor?: string
	postScriptBackgroundColor: string
	postScriptTextColor: string
	postScriptBorderColor?: string
	questionHeaderLinkColor?: string
}

export type Recipient_t = {
	email: string
	_id: string
}

export function themeObject(theme: Theme): ThemeObject {
	let obj: ThemeObject;
	switch (theme) {
		case 'november':
			obj = {
				backgroundColor: 'rgb(255, 255, 228)',
				questionTextColor: 'black',
				itemDefaultColor: 'rgb(114, 51, 17)',
				itemHoverColor: 'rgb(161, 73, 18)',
				itemTextColor: 'rgb(255, 255, 228)',
				headerTextColor: 'black',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
		case 'december-light':
			obj = {
				backgroundColor: '#fff',
				questionTextColor: '#01440f',
				itemDefaultColor: '#ae0000',
				itemHoverColor: '#01440f',
				itemTextColor: '#f2f2f2',
				borderColor: '#01440f',
				headerTextColor: '#01440f',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
		case 'december-dark':
			obj = {
				backgroundColor: '#01440f',
				questionTextColor: '#f2f2f2',
				itemDefaultColor: '#ae0000',
				itemHoverColor: '#00b409',
				itemTextColor: '#f2f2f2',
				borderColor: 'none',
				headerTextColor: '#01440f',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black

			};
			break;
		case 'january':
			obj = {
				backgroundColor: THEME_JAN.walnutBrown,
				headerTextColor: THEME_JAN.jasper,
				itemDefaultColor: THEME_JAN.bone,
				itemHoverColor: THEME_JAN.platinum,
				itemTextColor: THEME_JAN.blackOlive,
				questionTextColor: THEME_JAN.platinum,
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',

			};
			break;
		case 'february-light':
			obj = {
				backgroundColor: THEME_FEB_LIGHT.electricBlue,
				headerTextColor: THEME_FEB_LIGHT.chefchaouenBlue,
				itemDefaultColor: THEME_FEB_LIGHT.chefchaouenBlue,
				itemHoverColor: THEME_FEB_LIGHT.blush,
				itemTextColor: THEME_FEB_LIGHT.snow,
				questionTextColor: THEME_FEB_LIGHT.prussianBlue,
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none'

			};
			break;
		case 'march-light':
			obj = {
				headerTextColor: THEME_MARCH_LIGHT.lapisLazuli,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_MARCH_LIGHT.officeGreen,
				itemDefaultColor: THEME_MARCH_LIGHT.springGreen,
				itemHoverColor: THEME_MARCH_LIGHT.bakerMiller,
				itemTextColor: THEME_MARCH_LIGHT.lapisLazuli,
				postScriptBackgroundColor: THEME_MARCH_LIGHT.bakerMiller,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',
			};
			break;
		case 'april-light':
			obj = {
				headerTextColor: THEME_APRIL_LIGHT.robinsEgg,
				questionTextColor: THEME_APRIL_LIGHT.paynesGray,
				backgroundColor: THEME_APRIL_LIGHT.paleDogwood,
				itemDefaultColor: THEME_APRIL_LIGHT.lavenderPink,
				itemHoverColor: THEME_APRIL_LIGHT.vanillaIce,
				itemTextColor: THEME_APRIL_LIGHT.paynesGray,
				postScriptBackgroundColor: THEME_APRIL_LIGHT.lightGreen,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',
			};
			break;
		case 'may-dark':
			obj = {
				headerTextColor: THEME_MAY_DARK.claret,
				questionTextColor: THEME_MAY_DARK.mistyRose,
				backgroundColor: THEME_MAY_DARK.claret,
				itemDefaultColor: THEME_MAY_DARK.saffron,
				itemHoverColor: THEME_MAY_DARK.mistyRose,
				itemTextColor: THEME_MAY_DARK.charcoal,
				postScriptBackgroundColor: THEME_MAY_DARK.mistyRose,
				itemAdditionalStyles: 'font-weight: bold;',
				postScriptTextColor: THEME_MAY_DARK.charcoal,
				borderColor: 'none',
			};
			break;
		case 'june-light':
			obj = {
				headerTextColor: THEME_JUNE_LIGHT.flame,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_JUNE_LIGHT.flame,
				itemDefaultColor: THEME_JUNE_LIGHT.earthYellow,
				itemHoverColor: THEME_JUNE_LIGHT.icterine,
				itemTextColor: THEME_JUNE_LIGHT.blackOlive2,
				postScriptBackgroundColor: THEME_JUNE_LIGHT.airSuperiority,
				itemAdditionalStyles: `border: 2px solid ${THEME_JUNE_LIGHT.icterine}; border-radius: 5px;`,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'july-light':
			obj = {
				headerTextColor: THEME_JULY_LIGHT.americanBlue,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_JULY_LIGHT.fireEngineRed,
				itemDefaultColor: THEME_JULY_LIGHT.americanBlue,
				itemHoverColor: THEME_JULY_LIGHT.strawberryRed,
				itemTextColor: THEME_JULY_LIGHT.white,
				postScriptBackgroundColor: THEME_JULY_LIGHT.americanBlue,
				//itemAdditionalStyles: `border: 2px solid ${THEME_JULY_LIGHT.icterine}; border-radius: 5px;`,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'august-dark':
			obj = {
				headerTextColor: THEME_AUGUST_DARK.header,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_AUGUST_DARK.pollBackground,
				itemDefaultColor: THEME_AUGUST_DARK.optionsItem,
				itemHoverColor: THEME_AUGUST_DARK.optionsItemFillBar,
				itemTextColor: THEME_AUGUST_DARK.header,
				postScriptBackgroundColor: THEME_AUGUST_DARK.header,
				postScriptTextColor: THEME_AUGUST_DARK.optionsItemText,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'september-light':
			obj = {
				headerTextColor: THEME_SEPTEMBER_LIGHT.munsellBlue,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_SEPTEMBER_LIGHT.atomicTangerine,
				itemDefaultColor: THEME_SEPTEMBER_LIGHT.cerulean,
				itemHoverColor: THEME_SEPTEMBER_LIGHT.munsellBlue,
				itemTextColor: STANDARDS.white,
				postScriptBackgroundColor: THEME_SEPTEMBER_LIGHT.pakistanGreen,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: 'none',
				borderColor: 'none',
				questionHeaderLinkColor: THEME_SEPTEMBER_LIGHT.celadon,
			};
			break;
		default:
			obj = {
				backgroundColor: 'black',
				questionTextColor: 'white',
				itemDefaultColor: 'gray',
				itemHoverColor: 'white',
				itemTextColor: 'black',
				headerTextColor: 'black',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
	}
	return obj;
}

export function applyStyleToHtml(html: string, aStyle: string, pStyle: string) {
	return html.replaceAll(`<p>`, `<p style="${pStyle}">`).replaceAll(`<a `, `<a style="${aStyle}"`)
}

