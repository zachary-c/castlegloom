'use client'
import React, { useState } from 'react'
import '&/steamhash.scss'
import UserSummary, { UserSummary_t } from 'R/src/components/UserSummary'
import localFont from 'next/font/local'

const myFont = localFont({
    src: '../../styles/coolvetica/coolvetica rg.ttf',
    display: 'swap'
})

export default function Page() {
    const [idList, setIdList] = useState<string[]>([])
    const [nextId, setNextId] = useState('')
    const [games, setGames] = useState<string[]>([])
    const [notGames, setNotGames] = useState<string[]>([])
    const [message, setMessage] = useState('')
    const [userSteamId, setUserSteamId] = useState<string>('')
    const [userSumm, setUserSumm] = useState<UserSummary_t | null>(null)
    const [friendSummaries, setFriendSummaries] = useState<UserSummary_t[]>([])
    const [selectedFriends, setSelectedFriends] = useState<UserSummary_t[]>([])

    function addId(id : string, summary? : UserSummary_t) {
        if (!idList.includes(id)) {
            setIdList([...idList, id])
            if (summary) {
                setSelectedFriends([...selectedFriends, summary])
            }
        } else {
            setIdList(idList.filter((i) => i !== id))
            if (summary) {
                setSelectedFriends(selectedFriends.filter((f) => f.steamid !== summary.steamid))
            }
        }
    }
    function gamesOrNoGames(name : string) {
        if (games.includes(name)) {
            setNotGames([...notGames, name])
            setGames(games.filter((g) => g !== name));
        } else {
            setGames([...games, name])
            setNotGames(notGames.filter((g) => g !== name));    
        }
    }
    async function getFriends() {
        if (!userSteamId || userSteamId.length === 0) {
            setMessage("You must provide your Steam ID to search for friends");
            return
        }
        const res = await fetch(`/api/steamhash/get-friends?steamid=${userSteamId}`)
        const body = await res.json()
        setUserSumm(body.user)
        addId(body.user.steamid)
        setFriendSummaries(body.friendSummaries)
        setUserSteamId('')
        setMessage('')
        console.log('body', body)
    }

    async function postIds() {
        setGames(['...'])
        setNotGames([])
        const res = await fetch('/api/steamhash/hash', {
            method: 'POST',
            body: JSON.stringify({id_list: idList})
        })
        const body = await res.json()
        //console.log('res', body)
        if (res.ok) {
            setGames(body.games)
            setMessage('')
        } else {
            if (body.message) {
                setMessage(body.message)
            }
        }
    }
    function removeId(id : string, summary? : UserSummary_t) {
        setIdList(idList.filter((i) => i !== id))
        if (summary) {
            setSelectedFriends(selectedFriends.filter((f) => f.steamid !== summary.steamid))
        }

    }

    return (
        <html>
            <body>


                <main className={`main steamhash ${myFont.className}`}>
                    <img src={'./steem.png'} width='300px' title={'Steem'}/>
                    {idList.length > 0 && (idList.length === selectedFriends.length ? 
                        <>
                            <div className='steamid-container'>
                                {
                                    selectedFriends.map((f) => <> <UserSummary {...f} /> <button className='delete' onClick={() => removeId(f.steamid, f)}>X</button> </>)
                                }
                            </div>
                            <button onClick={postIds}>Find Shared Games</button>
                        </>
                        :
                        <>
                            <div className='steamid-container'>
                                <ul className='steamid-list'>
                                    {idList.map((id) => <li key={id}>{id} <button className='delete' onClick={() => removeId(id)}>X</button></li>)}
                                </ul>
                            </div>
                            <button onClick={postIds}>Find Shared Games</button>
                        </>)

                    }
                    <div className={`games-list ${games.length === 0 ? 'no-entries' : ''} ${games.length > 192 ? ' ' : games.length > 128 ? 'size-lg' : games.length > 64 ? 'size-md-2' : (games.length > 48 ? 'size-md' : 'size-sm')}`}>
                        {games[0] === '...' ?
                            <h4>Loading...</h4>
                        : 
                        games.sort().map((g) => <span onClick={() => gamesOrNoGames(g)} key={g}>{g}</span>)
                        }
                    </div>
                    {notGames.length > 0 &&
                        <>
                            <h4>Games we are NOT playing:</h4>
                            <div className={`games-list notgames ${notGames.length === 0 ? 'no-entries' : ''} ${notGames.length > 192 ? ' ' : notGames.length > 128 ? 'size-lg' : notGames.length > 64 ? 'size-md-2' : (notGames.length > 48 ? 'size-md' : 'size-sm')}`}>
                                {notGames.map((g) => <span onClick={() => gamesOrNoGames(g)} key={g}>{g}</span>)}
                            </div>
                        </>
                    }
                    <div className='steamid-by-friends'>
                        <span>Enter your Steam ID to select from your friends list:</span>
                        <input value={userSteamId} onChange={(e) => setUserSteamId(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getFriends() : {}}/>
                        <button onClick={getFriends}>Get Friends List </button>
                    </div>
                    {message.length > 0 &&
                        <span className='error-message'>{message}</span>
                    }
                    {userSumm && 
                        <div className="user-info">
                            <h4>You:</h4>
                                <UserSummary {...userSumm} onClick={() => addId(userSumm.steamid)} selected={idList.includes(userSumm.steamid)}/>
                        </div>
                    }
                    {friendSummaries.length > 0 && 
                        <div className='friends-info'>
                            <h4>{friendSummaries.length} Friends: </h4>
                            <div className={`friends-list ${friendSummaries.length > 96 ? ' ' : friendSummaries.length > 48 ? 'size-lg' : friendSummaries.length > 32 ? 'size-md-2' : (friendSummaries.length > 24 ? 'size-md' : 'size-sm')}`}>
                                {friendSummaries.sort((a, b) => a.personaname.toLowerCase().localeCompare(b.personaname.toLowerCase())).map((s, index) => 
                                    <UserSummary {...s} key={index} onClick={() => addId(s.steamid)} selected={idList.includes(s.steamid)}/>
                                )}
                            </div>
                        </div>
                    }
                    <div className='steamid-input'>
                        <span>Enter Steam IDs Individually:</span>
                        <input value={nextId} onChange={(e) => setNextId(e.target.value)}/>
                        <button onClick={() => addId(nextId)}>Add Id</button>
                    </div>
                </main>
            </body>
        </html>
    )
}


