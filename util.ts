export function suffix(day: number) {
	if (day == 1 || day == 21 || day == 31) return 'st';
	if (day == 2 || day == 22) return 'nd';
	if (day == 3 || day == 23) return 'rd';
	return "th";
}
export function english_th(num: number) {
	if (num == 0) return "zeroth";
	if (num == 1) return "first";
	if (num == 2) return "second";
	if (num == 3) return "third";
	if (num == 4) return "fourth";
	if (num == 5) return "fifth";
	if (num == 6) return "sixth";
	if (num == 7) return "seventh";
	if (num == 8) return "eighth";
	if (num == 9) return "ninth";
	if (num == 10) return "tenth";
	if (num == 11) return "eleventh";
	if (num == 12) return "twelfth";
	if (num == 13) return "thirteenth";
	if (num == 14) return "fourteenth";
	if (num == 15) return "fifteenth";
	if (num == 16) return "sixteenth";
}
export function padToTwo(num: number): string {
	if (num < 10) {
		return `0${num}`
	} else {
		return `${num}`
	}
}
export const SEVEN_HOURS_OF_MILLISECONDS = 1000 * 60 * 60 * 7;
export const SIX_HOURS_OF_MILLISECONDS = 1000 * 60 * 60 * 6;

export async function getSteamGames() {
	const data = await (await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')).json()

	//console.log(data.applist.apps)
	const dict: any = {}
	for (const game of data.applist.apps) {
		if (game.name?.length > 0) {
			dict[game.appid] = game.name;
		}
	}
	return dict;
}
/*
"crons": [
		{
			"path": "/api/send-poll?secret=spooktoberspooktoberspooktoberspooktober",
			"schedule": "30 17 * * *"
		}
	]
*/
