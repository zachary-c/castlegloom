'use client'
import "../styles/pollLeaderboard.scss"
import { LeaderboardRecord, UserRecord } from "$/lib/dashboard_queries"
import { Tooltip } from "react-tooltip"
import { useState } from "react"

const barcode = 'IIIIIIIIII'

export function Leaderboard({ leaderboardData, setLeaderboardData }: { leaderboardData: LeaderboardRecord[], setLeaderboardData: (val: LeaderboardRecord[]) => void }) {
	const [refreshing, setRefreshing] = useState(false)

	async function refreshLeaderboardData() {
		setRefreshing(true)
		const response = await fetch('/api/poll/leaderboard')
		const result: LeaderboardRecord[] = await response.json()

		setLeaderboardData(result)
		setRefreshing(false)
	}

	return (
		<div className="pd__leaderboard">
			<div className="pd__leaderboard__header">
				<h3>Leaderboard</h3>
				<div className="pd__leaderboard__refresh">
					{refreshing && <span>Refreshing...</span>}
					<button className="pd__btn" onClick={refreshLeaderboardData}>Refresh Leaderboard</button>
				</div>
			</div>
			<table className="pd__leaderboard__table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>User</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderboardData.map((rec, index) => (
						<tr className={`leaderboard-table-row${rec.isUser ? ' me' : ''} ${rec.color ? ' unique-color' : ''}`} key={index} style={{ color: rec.color, backgroundColor: rec.backgroundColor }}>
							<td className="rank">#{index + 1}</td>
							<td className="user" >
								{rec.joinedTitle
									? <span>{rec.joinedTitle}</span>
									: <span data-tooltip-id={`${index}-user`} className="barcode">{barcode}</span>
								}
							</td>
							<td className="score">{rec.score}</td>
							{!rec.joinedTitle &&
								<Tooltip id={`${index}-user`} place="right" content="This resident of the Castle has not generated a title!" />
							}
						</tr>
					))}
				</tbody>
			</table>

			<span className="pd__leaderboard__note">&quot;{barcode}&quot; indicates user has not generated a title.</span>
		</div>
	)
}
