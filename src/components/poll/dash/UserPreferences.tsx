import { useEffect, useMemo, useState } from "react"
import "../styles/pollPreferences.scss"
import { Concrete } from "$/lib/queries";
import { UserRecord } from "$/lib/dashboard_queries"
import { professionList, qualifierList } from "./types";
import { PreferenceTheme, randomInRange, theme_list } from "@/poll/pollUtil";

export function UserPreferences({ userRecord, setUserRecord, originalRecord, setOriginalRecord }: { userRecord: Concrete<UserRecord>, setUserRecord: (val: Concrete<UserRecord>) => void, originalRecord: Concrete<UserRecord>, setOriginalRecord: (val: Concrete<UserRecord>) => void }) {
	const [madeChanges, setMadeChanges] = useState(false)
	const [submitting, setSubmitting] = useState(false);
	const [message, setMessage] = useState("")
	const title = useMemo(() => userRecord.title ? (userRecord.title.profession + " " + userRecord.title.qualifier).trim() : undefined, [userRecord.title])
	useEffect(() => {
		if (userRecord.email !== originalRecord.email
			|| userRecord.isPolledDaily !== originalRecord.isPolledDaily
			|| userRecord.name !== originalRecord.name
			|| userRecord.theme !== originalRecord.theme
			|| userRecord.title?.profession !== originalRecord.title?.profession
			|| userRecord.title?.qualifier !== originalRecord.title?.qualifier) {
			setMessage("")
			setMadeChanges(true)
		} else {
			setMadeChanges(false)
		}
	}, [userRecord, originalRecord])

	function generateTitle() {
		let randomProfession, randomQualifier
		do {
			randomProfession = professionList[randomInRange(0, professionList.length)]
			randomQualifier = qualifierList[randomInRange(0, qualifierList.length)]
		} while (randomProfession === userRecord.title.profession || randomQualifier === userRecord.title.qualifier)
		setUserRecord({ ...userRecord, title: { qualifier: randomQualifier, profession: randomProfession } })
	}
	function updateTheme(value: string) {
		if (!theme_list.includes(value)) {
			setMessage("Theme not recognized, please refresh and try again.")
			return;
		}
		setUserRecord({ ...userRecord, theme: value as PreferenceTheme })
	}
	function resetData() {
		setUserRecord(originalRecord)
	}

	async function submitChanges() {
		setSubmitting(true);

		const result = await fetch("/api/user-preferences/set", {
			method: "POST",
			body: JSON.stringify(userRecord)
		})
		if (result.ok) {
			setOriginalRecord(userRecord)
			setMadeChanges(false)
			setMessage("Preferences Saved!")
		} else {
			setMessage("Sorry, something went wrong. Please try again later.")
		}
		setSubmitting(false)
	}

	return (
		<div className="pd__preferences">
			<h3>Personal Information</h3>
			<div className="pd__preferences__fieldset">
				<div className="pd__preferences__field centered">
					<p className="title__pre">{title ? `In the court of Castle Gloom, you are known as${userRecord.title.qualifier ? " the" : ""}...` : "No one knows who you are in the court of Castle Gloom. Generate a title using the button below."}</p>
					<span className="title__display">{title}</span>
					<button className="poll__btn generate" onClick={generateTitle}>Generate New Title</button>
				</div>
				<div className="pd__preferences__field">
					<label>Name:</label>
					<input value={userRecord.name} onChange={(e) => setUserRecord({ ...userRecord, name: e.target.value })} placeholder="Name" />
				</div>
				<div className="pd__preferences__field">
					<label>Email:</label>
					<input value={userRecord.email} onChange={(e) => setUserRecord({ ...userRecord, email: e.target.value })} placeholder="smith@castlegloom.com" />
				</div>
				<div className="pd__preferences__field checkbox">
					<input type='checkbox' checked={userRecord.isPolledDaily} onChange={(e) => setUserRecord({ ...userRecord, isPolledDaily: e.target.checked })} id='daily-poll-checkbox' />
					<label htmlFor='daily-poll-checkbox'>I would like to receive daily polls at the above email address.</label>
				</div>
			</div>
			<h3>Website Preferences</h3>
			<div className="pd__preferences__fieldset">
				<div className="pd__preferences__field select">
					<label>Website Theme:{userRecord.theme !== originalRecord.theme ? <span className="warning"> YOU HAVE UNSAVED CHANGES</span> : ""}</label>
					<select value={userRecord.theme} onChange={(e) => updateTheme(e.target.value)}>
						<option value="monthly">Monthly</option>
						<option value="wireframe-dark">Wireframe (Dark)</option>
						<option value="november-light">November</option>
						<option value="december-light">December</option>
						<option value="january-light">January</option>
					</select>
				</div>

			</div>
			{(madeChanges || message.length > 0) &&
				<div className="pd__preferences__divider" />
			}
			{madeChanges &&
				<div className="pd__preferences__submission">
					{!submitting &&
						<button className="poll__btn muted" onClick={resetData}>Reset</button>
					}
					<button className={`poll__btn ${submitting ? 'muted submitting' : "primary"}`} onClick={submitChanges}>{submitting ? 'Submitting...' : "Save Changes"}</button>
				</div>
			}
			{message.length > 0 &&
				<div className="pd__preferences__info-bar">
					<span>{message}</span>
				</div>
			}
		</div>
	)
}

/*

						<select value={userRecord.title.profession} onChange={ (e) => setUserRecord({...userRecord, title: {...userRecord.title, profession: e.target.value }}) } className="select-title profession">
							<option key={'null'} value="">Profession</option>
							{professionList.map((prof, index) => (
								<option key={index}>{prof}</option>
							))}
						</select>
						<select value={userRecord.title.qualifier} onChange={ (e) => setUserRecord({...userRecord, title: {...userRecord.title, qualifier: e.target.value }}) } className="select-title qualifier">
							<option key={'null'} value="">Qualifier</option>
							{qualifierList.map((prof, index) => (
								<option key={index}>{prof}</option>
							))}    
						</select>

						*/
