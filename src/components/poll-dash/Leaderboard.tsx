import "R/src/components/poll-dash/styles/pollLeaderboard.scss"
import { LeaderboardRecord, UserRecord } from "$/lib/dashboard_queries"
import { Tooltip } from "react-tooltip"

const barcode = 'IIIIIIIIII'

export function Leaderboard({ leaderboardData, setLeaderboardData } : { leaderboardData : LeaderboardRecord[], setLeaderboardData : (val : LeaderboardRecord[]) => void}) {
    return (
        <div className="pd__leaderboard">
            <div className="pd__leaderboard__header">
                <h3>Leaderboard</h3>
                <div>
                    <button className="">Refresh Leaderboard</button>
                </div>  
            </div>
            <div className="pd__leaderboard__body">
                <div className="leaderboard-table-row header">
                    <span className="rank">Rank</span>
                    <span className="user">User</span>
                    <span className="score">Score</span>
                </div>
                <ol className="pd__leaderboard__body__entries">
                {leaderboardData.map((rec, index) => (
                    <li className={`leaderboard-table-row${rec.isUser ? ' me' : ''}`} key={index}>
                        <span className="rank">#{index + 1}</span>
                        <span className="user">
                            {rec.joinedTitle 
                                ? <span>{rec.joinedTitle}</span>
                                : <span data-tooltip-id={`${index}-user`} className="barcode">{barcode}</span>
                            }
                        </span>
                        <span className="score">{rec.score}</span>
                        {!rec.joinedTitle && 
                            <Tooltip id={`${index}-user`} place="right" content="This user has not generated a title or given a name for themselves!"/>
                        }
                    </li>
                ))}
                </ol>
            </div>
            <span className="pd__leaderboard__note">&quot;{barcode}&quot; indicates user has not generated a title or name.</span>
            
        </div>
    )
}
