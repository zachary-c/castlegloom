'use client'
import React from 'react'
import './spooktober/styles/spookySignup.scss'


export default function SpookySignup() {
    const formRef = React.useRef<HTMLFormElement>(null)
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [submitMessage, setSubmitMessage] = React.useState("")
    const [email, setEmail] = React.useState('')


    const submitFormHandler = (event : SubmitEvent) => {
        console.log('here')
        if (!buttonDisabled && formRef.current) {
            setButtonDisabled(true)

            const data = new URLSearchParams();
            if (email) {
                data.append('email', email)
            }
            console.log('params made', data)
    
            //console.log(formRef.current);
            const requestOptions = {
                method: 'POST',
                body: data
            }
            console.log('about to fetch')
                        
            fetch('/api/form-submit', requestOptions).then((response) => {
                if (response.ok) {
                    setSubmitMessage('Success! You should receive an email confirming your signup shortly.')
                } else {
                    setSubmitMessage('Sorry, something went wrong.')
                }
            });       
  
        }
        setButtonDisabled(false);
        event.preventDefault()
    }

    return (
        <div className='spooky-signup'>
            <h3>Get Spooky Memes In Your Inbox!</h3> {/** @ts-ignore -- mysterious onSubmit handler */}
            <form title={'Spooky Scary Signup'} ref={formRef} onSubmit={submitFormHandler}>
                <div className='input-group'>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" data-isrequired={true} placeholder='someplace@example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <input type='submit' value='Submit'/>
            </form>
            <div className='spooky-signup__response'>
                <span>{submitMessage}</span>
            </div>
        </div>

    )
}