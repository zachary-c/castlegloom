'use client'

import "&/soundboard.scss"
import { KeyboardEvent, useEffect, useState } from "react"
const sermonAudio = 'http://localhost:3000/project2/anna_hurt.mp3'

function togglePress(record : Record<string, boolean>, code : string) {
    const t= {...record}
    t[code] = !t[code]
    return t
}

export default function Page() {
    const [log, setLog] = useState<string>("")
    const [audioCtx, setAudioCtx] = useState(new AudioContext())
    const [currentlyPressed, setCurrentlyPressed] = useState<Record<string, boolean>>({})
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>()

    function playSound(buffer : AudioBuffer) {
        var src = audioCtx.createBufferSource();
        src.buffer = buffer
        src.connect(audioCtx.destination)
        src.start()
    }

    useEffect(() => {
        async function loadAudio() {
            const request = await fetch(sermonAudio)
            const body = await request.arrayBuffer()
            audioCtx.decodeAudioData(body, (buffer) => {
                console.log("decoded!")
                setAudioBuffer(buffer)
            })
        }
        loadAudio()
    }, [])

    function keyDownLogger(e : KeyboardEvent<HTMLElement>) {
        if (currentlyPressed[e.code] && currentlyPressed[e.code] === true) {
            return
        }
        
        setCurrentlyPressed(cp => togglePress(cp, e.code))
        console.log("e", e.code, e)
        console.log(currentlyPressed)
        if (audioBuffer) {
            playSound(audioBuffer)
        }
    }
    function keyUpLogger(e : KeyboardEvent<HTMLElement>) {
        console.log("e", e.code, e)
        setCurrentlyPressed(cp => togglePress(cp, e.code))
    }

    return (
        <main onKeyDown={(e) => keyDownLogger(e)} onKeyUp={(e) => keyUpLogger(e)} tabIndex={0}>
            <div>hello {log}</div>
            <div className="kb__wrapper">
                <div id="f-keys" className="kb__row">
                    <div className="kb__row__group f-keys">
                        <span className="kb__esc">Esc</span>
                    </div>
                    <div className="kb__row__group f-keys">
                        <span className={currentlyPressed['F1'] ? 'pressed' : ''}>f1</span>
                        <span className={currentlyPressed['F2'] ? 'pressed' : ''}>f2</span>
                        <span className={currentlyPressed['F3'] ? 'pressed' : ''}>f3</span>
                        <span className={currentlyPressed['F4'] ? 'pressed' : ''}>f4</span>
                    </div>
                    <div className="kb__row__group f-keys">
                        <span className={currentlyPressed['F5'] ? 'pressed' : ''}>f5</span>
                        <span className={currentlyPressed['F6'] ? 'pressed' : ''}>f6</span>
                        <span className={currentlyPressed['F7'] ? 'pressed' : ''}>f7</span>
                        <span className={currentlyPressed['F8'] ? 'pressed' : ''}>f8</span>
                    </div>
                    <div className="kb__row__group f-keys">
                        <span className={currentlyPressed['F9'] ? 'pressed' : ''}>f9</span>
                        <span className={currentlyPressed['F10'] ? 'pressed' : ''}>f10</span>
                        <span className={currentlyPressed['F11'] ? 'pressed' : ''}>f11</span>
                        <span className={currentlyPressed['F12'] ? 'pressed' : ''}>f12</span>
                    </div>                    
                </div>
                <div className="kb__row">
                    <div className="kb__row__group reg-keys">
                        <span className={currentlyPressed['Backquote'] ? 'pressed' : ''}>~</span>
                        <span className={currentlyPressed['Digit1'] ? 'pressed' : ''}>1</span>
                        <span className={currentlyPressed['Digit2'] ? 'pressed' : ''}>2</span>
                        <span className={currentlyPressed['Digit3'] ? 'pressed' : ''}>3</span>
                        <span className={currentlyPressed['Digit4'] ? 'pressed' : ''}>4</span>
                        <span className={currentlyPressed['Digit5'] ? 'pressed' : ''}>5</span>
                        <span className={currentlyPressed['Digit6'] ? 'pressed' : ''}>6</span>
                        <span className={currentlyPressed['Digit7'] ? 'pressed' : ''}>7</span>
                        <span className={currentlyPressed['Digit8'] ? 'pressed' : ''}>8</span>
                        <span className={currentlyPressed['Digit9'] ? 'pressed' : ''}>9</span>
                        <span className={currentlyPressed['Digit0'] ? 'pressed' : ''}>0</span>
                        <span className={currentlyPressed['Minus'] ? 'pressed' : ''}>-</span>
                        <span className={currentlyPressed['Equal'] ? 'pressed' : ''}>=</span>
                        <span className={`kb__ra kb__backspace ${currentlyPressed['Backspace'] ? 'pressed' : ''}`}>backspace</span>
                    </div>
                </div>
                <div className="kb__row">
                    <div className="kb__row__group reg-keys">
                        <span className={`kb__tab ${currentlyPressed['Tab'] ? 'pressed' : ''}`}>tab</span>
                        <span className={currentlyPressed['KeyQ'] ? 'pressed' : ''}>Q</span>
                        <span className={currentlyPressed['KeyW'] ? 'pressed' : ''}>W</span>
                        <span className={currentlyPressed['KeyE'] ? 'pressed' : ''}>E</span>
                        <span className={currentlyPressed['KeyR'] ? 'pressed' : ''}>R</span>
                        <span className={currentlyPressed['KeyT'] ? 'pressed' : ''}>T</span>
                        <span className={currentlyPressed['KeyY'] ? 'pressed' : ''}>Y</span>
                        <span className={currentlyPressed['KeyU'] ? 'pressed' : ''}>U</span>
                        <span className={currentlyPressed['KeyI'] ? 'pressed' : ''}>I</span>
                        <span className={currentlyPressed['KeyO'] ? 'pressed' : ''}>O</span>
                        <span className={currentlyPressed['KeyP'] ? 'pressed' : ''}>P</span>
                        <span className={currentlyPressed['BracketLeft'] ? 'pressed' : ''}>{"["}</span>
                        <span className={currentlyPressed['BracketRight'] ? 'pressed' : ''}>{"]"}</span>
                        <span className={`kb__ra kb__tab ${currentlyPressed['Backslash'] ? 'pressed' : ''}`}>\</span>
                    </div>
                </div>
                <div className="kb__row">
                    <div className="kb__row__group reg-keys">
                        <span className={`kb__caps ${currentlyPressed['CapsLock'] ? 'pressed' : ''}`}>caps lock</span>
                        <span className={currentlyPressed['KeyA'] ? 'pressed' : ''}>A</span>
                        <span className={currentlyPressed['KeyS'] ? 'pressed' : ''}>S</span>
                        <span className={currentlyPressed['KeyD'] ? 'pressed' : ''}>D</span>
                        <span className={currentlyPressed['KeyF'] ? 'pressed' : ''}>F</span>
                        <span className={currentlyPressed['KeyG'] ? 'pressed' : ''}>G</span>
                        <span className={currentlyPressed['KeyH'] ? 'pressed' : ''}>H</span>
                        <span className={currentlyPressed['KeyJ'] ? 'pressed' : ''}>J</span>
                        <span className={currentlyPressed['KeyK'] ? 'pressed' : ''}>K</span>
                        <span className={currentlyPressed['KeyL'] ? 'pressed' : ''}>L</span>
                        <span className={currentlyPressed['Semicolon'] ? 'pressed' : ''}>;</span>
                        <span className={currentlyPressed['Quote'] ? 'pressed' : ''}>'</span>
                        <span className={`kb__ra kb__enter ${currentlyPressed['Enter'] ? 'pressed' : ''}`}>Enter</span>
                    </div>
                </div>
                <div className="kb__row">
                    <div className="kb__row__group reg-keys">
                        <span className={`kb__enter ${currentlyPressed['ShiftLeft'] ? 'pressed' : ''}`}>shift</span>
                        <span className={currentlyPressed['KeyZ'] ? 'pressed' : ''}>Z</span>
                        <span className={currentlyPressed['KeyX'] ? 'pressed' : ''}>X</span>
                        <span className={currentlyPressed['KeyC'] ? 'pressed' : ''}>C</span>
                        <span className={currentlyPressed['KeyV'] ? 'pressed' : ''}>V</span>
                        <span className={currentlyPressed['KeyB'] ? 'pressed' : ''}>B</span>
                        <span className={currentlyPressed['KeyN'] ? 'pressed' : ''}>N</span>
                        <span className={currentlyPressed['KeyM'] ? 'pressed' : ''}>M</span>
                        <span className={currentlyPressed['Comma'] ? 'pressed' : ''}>,</span>
                        <span className={currentlyPressed['Period'] ? 'pressed' : ''}>.</span>
                        <span className={currentlyPressed['Slaslh'] ? 'pressed' : ''}>/</span>
                        <span className={`kb__ra kb__right-shift ${currentlyPressed['ShiftRight'] ? 'pressed' : ''}`}>shift</span>
                    </div>
                </div>
                <div className="kb__row">
                    <div className="kb__row__group reg-keys">
                        <span className={`kb__lctrl ${currentlyPressed['ControlLeft'] ? 'pressed' : ''}`}>ctrl</span>
                        <span className={`unpressable`}>fn</span>
                        <span className={currentlyPressed['MetaLeft'] ? 'pressed' : ''}>Win</span>
                        <span className={currentlyPressed['AltLeft'] ? 'pressed' : ''}>alt</span>
                        <span className={`kb__space ${currentlyPressed['Space'] ? 'pressed' : ''}`}></span>
                        <span className={currentlyPressed['AltRight'] ? 'pressed' : ''}>alt</span>
                        <span className={`unpressable`}>fn</span>
                        <span className={currentlyPressed['ContextMenu'] ? 'pressed' : ''}>Mnu</span>
                        <span className={`kb__ra kb__rctrl ${currentlyPressed['CtrlRight'] ? 'pressed' : ''}`}>ctrl</span>
                    </div>
                </div>
            </div>

        </main>
    )
}