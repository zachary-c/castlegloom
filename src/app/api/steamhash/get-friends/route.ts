import { NextRequest, NextResponse } from 'next/server';

// Resolve username (e.g. convert legitbannana to whatever your actual id if you don't have one set up)
// https://wiki.teamfortress.com/wiki/WebAPI/ResolveVanityURL

const aliases : Record<string, string> = {
    'green': '76561198098540676'
}

export async function GET(request : NextRequest) {
    const params = request.nextUrl.searchParams
    let userId = params.get('steamid')
    console.log("have id", userId)
    if (!userId) {
        return NextResponse.json({
            message: 'You need to provide a steamid to retrieve friends.',
            type: 'error'
        }, {
            status: 400,
            statusText: 'Bad Request'
        })
    }
    if (aliases[userId]) {
        userId = aliases[userId]
    }

    const friendsResponse = await fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v1?key=${process.env.STEAM_API_KEY}&steamid=${userId}&format=json`) 
    if (!friendsResponse.ok) {
        return NextResponse.json({
            message: 'Something went wrong when attempting to retrieve friends.',
            type: 'error'
        }, {
            status: 400,
            statusText: 'Bad Request'
        })
    }
    const friendsJson = await friendsResponse.json()
    let commaFriendList : string = userId
    friendsJson.friendslist.friends.forEach((f : {steamid : string, relationship : string, friend_since : number}) => {
        commaFriendList += `,${f.steamid}`
    })
    console.log('commaFriendList', commaFriendList)


    const summariesResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2?key=${process.env.STEAM_API_KEY}&format=json&steamids=${commaFriendList}`)
    if (!summariesResponse.ok) {
        return NextResponse.json({
            message: 'Something went wrong when attempting to retrieve summaries.',
            type: 'error'
        }, {
            status: 400,
            statusText: 'Bad Request'
        })
    }
    const summariesJson = await summariesResponse.json()
    console.log(summariesJson.response.players)

    return NextResponse.json(
        {
            user: summariesJson.response.players.filter((j : { steamid : string}) => j.steamid === userId)[0],
            friendSummaries: summariesJson.response.players.filter((f : { steamid : string }) => f.steamid !== userId)
        },
        {
            status: 200,
        }
    )
}
