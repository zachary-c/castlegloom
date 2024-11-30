export function suffix(day : number) {
    if (day == 1 || day == 21 || day == 31) return 'st';
    if (day == 2 || day == 22) return 'nd';
    if (day == 3 || day == 23) return 'rd';
    return "th";
}
export function padToTwo(num : number) : string{
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
    const dict : any = {}
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