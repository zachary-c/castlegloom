import { useContext, useEffect, useMemo, useState } from "react"
import "R/src/components/poll-dash/styles/pollPreferences.scss"
import { UserContext } from "./DashTabs";
import { Concrete, UserRecord } from "$/lib/queries";
import { professionList, qualifierList } from "./types";
import { randomInRange } from "@/poll/pollUtil";



export function UserPreferences({ userRecord, setUserRecord, originalRecord, setOriginalRecord } : { userRecord : Concrete<UserRecord>, setUserRecord : (val : Concrete<UserRecord>) => void, originalRecord : Concrete<UserRecord>, setOriginalRecord : (val : Concrete<UserRecord>) => void}) {
    const [madeChanges, setMadeChanges] = useState(false)
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (userRecord.email !== originalRecord.email 
            || userRecord.isPolledDaily !== originalRecord.isPolledDaily 
            || userRecord.name !== originalRecord.name
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
        setUserRecord({...userRecord, title: {qualifier: randomQualifier, profession: randomProfession }})
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
            <div className="pd__preferences__personal">
                <div className="pd__preferences__field">
                    <label>Name:</label> 
                    <input value={userRecord.name} onChange={ (e) => setUserRecord({...userRecord, name: e.target.value}) } placeholder="Name" />
                </div>
                <div className="pd__preferences__field">
                    <label>Title:</label> 
                    <div className="pd__preferences__field--grouped full">
                        <input value={userRecord.title.profession + " " + userRecord.title.qualifier} disabled/>
                        <button className="poll__btn generate" onClick={generateTitle}>Generate Title</button>
                    </div>
                </div>
                <div className="pd__preferences__field">
                    <label>Email:</label>
                    <input value={userRecord.email} onChange={ (e) => setUserRecord({...userRecord, email: e.target.value}) } placeholder="smith@castlegloom.com"/>
                </div>
                <div className="pd__preferences__field pd__preferences__field--checkbox">
                    <input type='checkbox' checked={userRecord.isPolledDaily} onChange={ (e) => setUserRecord({...userRecord, isPolledDaily: e.target.checked}) } id='daily-poll-checkbox'/>
                    <label htmlFor='daily-poll-checkbox'>I would like to receive daily polls at the above email address.</label>
                </div>
            </div>
            {(madeChanges || message.length > 0) && 
                <div className="pd__preferences__divider"/>
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