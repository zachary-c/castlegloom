
export type UserSummary_t = {
    steamid : string,
    communityvisibilitystate : number,
    personaname : string,
    profileurl : string,
    avatar : string,
    avatarmedium : string,
    avatarfull : string,
    avatarhash : string,
    lastlogoff : number,
    personastate : number,
    // 0 = offline or private profile
    // 1 = online
    // 2 = busy
    // 3 = away
    // 4 = snooze
    // 5 = looking to trade
    // 6 = looking to play
    primaryclanid : string,
    timecreated : number,
    personastateflags : 0, 
    realname? : string,
    gameextrainfo? : string,

}

export default function UserSummary(summary : UserSummary_t & { onClick? : () => void, selected? : boolean}) {

    let status : string = ''
    if (summary.personastate === 0) {
        status = 'Offline/Private'
    } else if (summary.personastate === 1) {
        status = 'Online'
    } else if (summary.personastate === 2) {
        status = 'Busy'
    } else if (summary.personastate === 3) {
        status = 'Away'
    } else if (summary.personastate === 4) {
        status = 'Snooze'
    }

    return (
        <div className={`user-summary state__${summary.personastate} ${summary.selected ? 'selected' : ''}`} onClick={summary.onClick}>
            <div className='user-summary__start'>
                <img className='us-pfp' src={summary.avatar}/>
                <div className='user-summary__text'>
                    <span className='us-name'>{summary.personaname}</span>
                    {summary.gameextrainfo &&
                        <span className='us-playing'>{summary.gameextrainfo}</span>
                    }
                </div>
            </div>
            <div className='user-summary__end'>
                <span className='us-status'>{status}</span>
            </div>
        </div>
    )
    
}