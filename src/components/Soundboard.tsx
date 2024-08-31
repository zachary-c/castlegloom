'use client'

import { Sound_t, SoundPreset } from "$/schemaTypes/soundPreset"
import "&/soundboard.scss"
import { KeyboardEvent, Ref, RefObject, useEffect, useRef, useState } from "react"

function togglePress(record : Record<string, boolean>, code : string) {
    const t= {...record}
    t[code] = !t[code]
    return t
}
const CAPS_ON_FADE_TIME = 5
const CAPS_OFF_FADE_TIME = 10


type PlayingSrcAndNode = {
    source : AudioBufferSourceNode
    effectNode : GainNode
}

export default function Soundboard({preset} : { preset : SoundPreset }) {
    const [log, setLog] = useState<string>("")
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)
    const [currentlyPressed, setCurrentlyPressed] = useState<Record<string, boolean>>({})
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>()
    const [audioBuffers, setAudioBuffers] = useState<Record<string, AudioBuffer>>({})
    const [playingSrcs, setPlayingSrcs] = useState<Record<string, PlayingSrcAndNode>>({})
    const [sequentialQueue, setSequentialQueue] = useState<PlayingSrcAndNode[]>([])
    const inp = useRef<HTMLInputElement>(null)
    const [allLoaded, setAllLoaded] = useState<boolean>(false)

    function stopHandler(e : KeyboardEvent<HTMLElement>, srcs : PlayingSrcAndNode[]) {
        const ctx = audioCtx as AudioContext

        if (currentlyPressed["AltRight"]) {
            srcs.forEach((src) => {
                src.effectNode.gain.setValueAtTime(src.effectNode.gain.value, ctx.currentTime)
                src.effectNode.gain.exponentialRampToValueAtTime(0.001, 
                    ctx.currentTime + 
                    (e.getModifierState("CapsLock") ? CAPS_ON_FADE_TIME : CAPS_OFF_FADE_TIME)
                )
            })
            srcs.forEach((src) => {
                src.source.stop(ctx.currentTime + (e.getModifierState("CapsLock") ? CAPS_ON_FADE_TIME : CAPS_OFF_FADE_TIME))
            })
        } else {
            srcs.forEach((src) => {
                src.source.stop()
            })
        }

    }

    function audioKey(e : KeyboardEvent<HTMLElement>) : boolean {
        let recognized = false;
        const ctx = audioCtx as AudioContext
        switch (e.code) {
            case 'Backspace': 
                recognized = true;
                console.log("Backspacing", currentlyPressed, currentlyPressed["AltRight"])
                stopHandler(e, Object.values(playingSrcs))
                break; 
            case "PageUp":
                recognized = true;
                const oldest = [...Object.keys(playingSrcs)].sort((a, b) => a >= b ? 1 : -1)[0]
                console.log("oldest", oldest, playingSrcs)
                //playingSrcs[oldest].source.stop()
                stopHandler(e, [playingSrcs[oldest]])
                break;
            case "PageDown":
                recognized = true;
                const newest = [...Object.keys(playingSrcs)].sort((a, b) => a < b ? 1 : -1)[0]
                console.log("newest", newest, playingSrcs)
                stopHandler(e, [playingSrcs[newest]])
                break;
            case "AltLeft":
                recognized = true;
                break;
            case "Space":
                recognized = true;
                if (ctx.state === 'suspended') {
                    ctx.resume()
                } else {
                    ctx.suspend()
                }
                break;

        }
        return recognized
    }
    
    function focusInput() {
        if (inp.current) {
            inp.current.focus()
        }
    }

    useEffect(() => {
        console.log("src", playingSrcs)
        focusInput()
    }, [playingSrcs])

    function readyAudioBufferSourceNode(buffer : AudioBuffer, fadeIn? : number) : PlayingSrcAndNode {
        const ctx = audioCtx as AudioContext
        var src = ctx.createBufferSource();
        src.buffer = buffer
        const gainNode = ctx.createGain()
        gainNode.gain.setValueAtTime(fadeIn ? 0.01 : 1, ctx.currentTime)
        console.log("gain node created!", gainNode, fadeIn)
        src.connect(gainNode)
        if (fadeIn) {
            console.log("fading in!", gainNode, fadeIn)
            console.log("gainNode", gainNode.gain.value)
            gainNode.gain.exponentialRampToValueAtTime(1, ctx.currentTime + fadeIn)
        }
        gainNode.connect(ctx.destination)
        return {
            source: src,
            effectNode: gainNode
        };
    }

    function playSound(srcObj : PlayingSrcAndNode) {

        const now = Date.now()
        srcObj.source.start()
        setPlayingSrcs(p => {
            const t = {...p}
            t[now] = srcObj;
            return t;
        })
        srcObj.source.addEventListener('ended', () => {
            setPlayingSrcs(p => {
                const t = {...p}
                delete t[now]
                return t;
            })
        })
    }
    useEffect(() => {
        setAudioCtx(new AudioContext())
    }, [])

    useEffect(() => {
        if (!audioCtx) return
        async function loadAudio(audio : Sound_t | null) {
            if (audio === null || audioCtx === null) {
                return
            }
            const request = await fetch(audio.url)
            const body = await request.arrayBuffer()
            return audioCtx.decodeAudioData(body, (buffer) => {
                console.log("decoded!", )
                setAudioBuffers(b => {
                    const newBuffers = { ...b }
                    newBuffers[audio.key] = buffer
                    return newBuffers
                })
            })
        }
        async function loadAllAudio() {
            const keys = Object.keys(preset)
            const promises = []
            for (const k of keys) {
                const key = k as keyof SoundPreset
                promises.push(loadAudio(preset[key]))
            }
    
            Promise.all(promises).then((r) => {
                setAllLoaded(true)
            })
        }
        loadAllAudio()
    }, [preset, audioCtx])

    function keyDownLogger(e : KeyboardEvent<HTMLElement>) {
        focusInput()
        if (!audioCtx) return
        if ((currentlyPressed[e.code] && currentlyPressed[e.code] === true) || e.code === 'CapsLock') {
            console.log("returning", e, currentlyPressed)
            return
        }
        setCurrentlyPressed(cp => togglePress(cp, e.code))
        if (audioKey(e) || !audioBuffers[e.code]) return

        if (currentlyPressed["CapsLock"] && !e.getModifierState("CapsLock")) {
            setCurrentlyPressed(c => togglePress(c, "CapsLock"))
        } else if (!currentlyPressed["CapsLock"] && e.getModifierState("CapsLock")) {
            setCurrentlyPressed(c => togglePress(c, "CapsLock"))
        }
        console.log("e", e.code, e)
        let source
        if (currentlyPressed["AltLeft"]) {
            console.log("playing with fade", e.getModifierState("CapsLock"))
            const fadeIn = e.getModifierState("CapsLock") ? CAPS_ON_FADE_TIME : CAPS_OFF_FADE_TIME
            source = readyAudioBufferSourceNode(audioBuffers[e.code], fadeIn)
        } else {
            source = readyAudioBufferSourceNode(audioBuffers[e.code])
        }
        // if shifted, queue it
        if (currentlyPressed["ShiftLeft"]) {
            console.log("Left Shift is on!")
            setSequentialQueue(sq => [...sq, source])
        // if not, play it immediately
        } else if (audioBuffers[e.code]) {
            playSound(source)
        }
    }
    function keyUpLogger(e : KeyboardEvent<HTMLElement>) {
        if (e.code === 'ShiftLeft' && sequentialQueue.length > 0) {
            console.log("queueing tracks!", sequentialQueue)
            for (let i = 0; i < sequentialQueue.length-1; i++) {
                const src = sequentialQueue[i]
                if (!src.source.buffer) continue;

                src.source.addEventListener('ended', () => {
                    playSound(sequentialQueue[i+1])
                })
            }
            playSound(sequentialQueue[0])
            setSequentialQueue([])
        }
        console.log("KEYUP", e.code, e)
        setCurrentlyPressed(cp => togglePress(cp, e.code))
    }

    return (
        <main onClick={focusInput} onKeyDown={(e) => keyDownLogger(e)} onKeyUp={(e) => keyUpLogger(e)} tabIndex={0}>
            <h1>Soundboard</h1>
            <div className="kb__wrapper">
                <div className="kb__center-group">
                    <div id="f-keys" className="kb__row">
                        <div className="kb__row__group f-keys">
                            <span className="kb__esc fill-space">Esc</span>
                        </div>
                        <div className="kb__row__group f-keys">
                            <span className={`unpressable ${currentlyPressed['F1'] ? 'pressed' : ''}`}>f1</span>
                            <span className={`unpressable ${currentlyPressed['F2'] ? 'pressed' : ''}`}>f2</span>
                            <span className={`unpressable ${currentlyPressed['F3'] ? 'pressed' : ''}`}>f3</span>
                            <span className={`unpressable ${currentlyPressed['F4'] ? 'pressed' : ''}`}>f4</span>
                        </div>
                        <div className="kb__row__group f-keys">
                            <span className={`unpressable ${currentlyPressed['F5'] ? 'pressed' : ''}`}>f5</span>
                            <span className={`unpressable ${currentlyPressed['F6'] ? 'pressed' : ''}`}>f6</span>
                            <span className={`unpressable ${currentlyPressed['F7'] ? 'pressed' : ''}`}>f7</span>
                            <span className={`unpressable ${currentlyPressed['F8'] ? 'pressed' : ''}`}>f8</span>
                        </div>
                        <div className="kb__row__group f-keys">
                            <span className={`unpressable ${currentlyPressed['F9'] ? 'pressed' : ''}`}>f9</span>
                            <span className={`unpressable ${currentlyPressed['F10'] ? 'pressed' : ''}`}>f10</span>
                            <span className={`unpressable ${currentlyPressed['F11'] ? 'pressed' : ''}`}>f11</span>
                            <span className={`unpressable ${currentlyPressed['F12'] ? 'pressed' : ''}`}>f12</span>
                        </div>                    
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={currentlyPressed['Backquote'] ? 'pressed' : ''}>~ {preset.Backquote?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit1'] ? 'pressed' : ''}>1 {preset.Digit1?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit2'] ? 'pressed' : ''}>2 {preset.Digit2?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit3'] ? 'pressed' : ''}>3 {preset.Digit3?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit4'] ? 'pressed' : ''}>4 {preset.Digit4?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit5'] ? 'pressed' : ''}>5 {preset.Digit5?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit6'] ? 'pressed' : ''}>6 {preset.Digit6?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit7'] ? 'pressed' : ''}>7 {preset.Digit7?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit8'] ? 'pressed' : ''}>8 {preset.Digit8?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit9'] ? 'pressed' : ''}>9 {preset.Digit9?.filename ?? ''}</span>
                            <span className={currentlyPressed['Digit0'] ? 'pressed' : ''}>0 {preset.Digit0?.filename ?? ''}</span>
                            <span className={currentlyPressed['Minus'] ? 'pressed' : ''}>- {preset.Minus?.filename ?? ''}</span>
                            <span className={currentlyPressed['Equal'] ? 'pressed' : ''}>= {preset.Equal?.filename ?? ''}</span>
                            <span className={`kb__ra kb__backspace fill-space ${currentlyPressed['Backspace'] ? 'pressed' : ''}`}>backspace</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={`kb__tab fill-space unpressable `}>tab</span>
                            <span className={currentlyPressed['KeyQ'] ? 'pressed' : ''}>Q <div className="filename">{preset.KeyQ?.filename ?? ''}</div></span>
                            <span className={currentlyPressed['KeyW'] ? 'pressed' : ''}>W {preset.KeyW?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyE'] ? 'pressed' : ''}>E {preset.KeyE?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyR'] ? 'pressed' : ''}>R {preset.KeyR?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyT'] ? 'pressed' : ''}>T {preset.KeyT?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyY'] ? 'pressed' : ''}>Y {preset.KeyY?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyU'] ? 'pressed' : ''}>U {preset.KeyU?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyI'] ? 'pressed' : ''}>I {preset.KeyI?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyO'] ? 'pressed' : ''}>O {preset.KeyO?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyP'] ? 'pressed' : ''}>P {preset.KeyP?.filename ?? ''}</span>
                            <span className={currentlyPressed['BracketLeft'] ? 'pressed' : ''}>{"["} {preset.BracketLeft?.filename ?? ''}</span>
                            <span className={currentlyPressed['BracketRight'] ? 'pressed' : ''}>{"]"} {preset.BracketRight?.filename ?? ''}</span>
                            <span className={`kb__ra kb__tab fill-space ${currentlyPressed['Backslash'] ? 'pressed' : ''}`}>\</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={`kb__caps fill-space ${currentlyPressed['CapsLock'] ? 'pressed' : ''}`}>caps lock</span>
                            <span className={currentlyPressed['KeyA'] ? 'pressed' : ''}>A {preset.KeyA?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyS'] ? 'pressed' : ''}>S {preset.KeyS?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyD'] ? 'pressed' : ''}>D {preset.KeyD?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyF'] ? 'pressed' : ''}>F {preset.KeyF?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyG'] ? 'pressed' : ''}>G {preset.KeyG?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyH'] ? 'pressed' : ''}>H {preset.KeyH?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyJ'] ? 'pressed' : ''}>J {preset.KeyJ?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyK'] ? 'pressed' : ''}>K {preset.KeyK?.filename ?? ''}</span>
                            <span className={currentlyPressed['KeyL'] ? 'pressed' : ''}>L {preset.KeyL?.filename ?? ''}</span>
                            <span className={currentlyPressed['Semicolon'] ? 'pressed' : ''}>; {preset.Semicolon?.filename ?? ''}</span>
                            <span className={currentlyPressed['Quote'] ? 'pressed' : ''}>{"'"} {preset.Quote?.filename ?? ''}</span>
                            <span className={`kb__ra kb__enter fill-space ${currentlyPressed['Enter'] ? 'pressed' : ''}`}>Enter</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={`kb__enter fill-space ${currentlyPressed['ShiftLeft'] ? 'pressed' : ''}`}>shift</span>
                            <span className={currentlyPressed['KeyZ'] ? 'pressed' : ''}>Z</span>
                            <span className={currentlyPressed['KeyX'] ? 'pressed' : ''}>X</span>
                            <span className={currentlyPressed['KeyC'] ? 'pressed' : ''}>C</span>
                            <span className={currentlyPressed['KeyV'] ? 'pressed' : ''}>V</span>
                            <span className={currentlyPressed['KeyB'] ? 'pressed' : ''}>B</span>
                            <span className={currentlyPressed['KeyN'] ? 'pressed' : ''}>N</span>
                            <span className={currentlyPressed['KeyM'] ? 'pressed' : ''}>M</span>
                            <span className={currentlyPressed['Comma'] ? 'pressed' : ''}>,</span>
                            <span className={currentlyPressed['Period'] ? 'pressed' : ''}>.</span>
                            <span className={currentlyPressed['Slash'] ? 'pressed' : ''}>/</span>
                            <span className={`kb__ra kb__right-shift fill-space ${currentlyPressed['ShiftRight'] ? 'pressed' : ''}`}>shift</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={`kb__lctrl fill-space ${currentlyPressed['ControlLeft'] ? 'pressed' : ''}`}>ctrl</span>
                            <span className={`unpressable`}>fn</span>
                            <span className={currentlyPressed['MetaLeft'] ? 'pressed' : ''}>Win</span>
                            <span className={currentlyPressed['AltLeft'] ? 'pressed' : ''}>alt</span>
                            <span className={`kb__space fill-space ${currentlyPressed['Space'] ? 'pressed' : ''}`}></span>
                            <span className={currentlyPressed['AltRight'] ? 'pressed' : ''}>alt</span>
                            <span className={`unpressable`}>fn</span>
                            <span className={currentlyPressed['ContextMenu'] ? 'pressed' : ''}>Mnu</span>
                            <span className={`kb__ra fill-space kb__rctrl ${currentlyPressed['ControlRight'] ? 'pressed' : ''}`}>ctrl</span>
                        </div>
                    </div>
                </div>
                <div className="kb__arrow-group">
                    <div className="kb__row">
                        <div className="kb__row__group util-keys">
                            <span className={currentlyPressed['F13'] ? 'pressed' : ''}>prt sc</span>
                            <span className="unpressable">scrl lck</span>
                            <span className="unpressable">pse brk</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={currentlyPressed['Help'] ? 'pressed' : ''}>insert</span>
                            <span className={currentlyPressed['Home'] ? 'pressed' : ''}>home</span>
                            <span className={currentlyPressed['PageUp'] ? 'pressed' : ''}>pg up</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={currentlyPressed['Delete'] ? 'pressed' : ''}>delete</span>
                            <span className={currentlyPressed['End'] ? 'pressed' : ''}>end</span>
                            <span className={currentlyPressed['PageDown'] ? 'pressed' : ''}>pg dn</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={"spacer-key"}></span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys centered">
                            <span className={currentlyPressed['ArrowUp'] ? 'pressed' : ''}>^</span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={currentlyPressed['ArrowLeft'] ? 'pressed' : ''}>{"<"}</span>
                            <span className={currentlyPressed['ArrowDown'] ? 'pressed' : ''}>{"V"}</span>
                            <span className={currentlyPressed['ArrowRight'] ? 'pressed' : ''}>{">"}</span>
                        </div>
                    </div>
               </div>
               <div className="kb__arrow-group">
                    <div className="kb__row">
                        <div className="kb__row__group util-keys">
                            <span className={'unpressable'}></span>
                            <span className={'unpressable'}></span>
                            <span className={'unpressable'}></span>
                            <span className={'unpressable'}></span>
                        </div>
                    </div>
                    <div className="kb__row">
                        <div className="kb__row__group reg-keys">
                            <span className={currentlyPressed['NumLock'] ? 'pressed' : ''}>num lock</span>
                            <span className={currentlyPressed['NumpadDivide'] ? 'pressed' : ''}>/</span>
                            <span className={currentlyPressed['NumpadMultiply'] ? 'pressed' : ''}>*</span>
                            <span className={currentlyPressed['NumpadSubtract'] ? 'pressed' : ''}>-</span>
                        </div>
                    </div>
                    <div className="kb__numpad-layout">
                        <div className="kb__arrow-group">
                            <div className="kb__row">
                                <div className="kb__row__group reg-keys">
                                    <span className={currentlyPressed['Numpad7'] ? 'pressed' : ''}>7</span>
                                    <span className={currentlyPressed['Numpad8'] ? 'pressed' : ''}>8</span>
                                    <span className={currentlyPressed['Numpad9'] ? 'pressed' : ''}>9</span>
                                </div>
                            </div>
                            <div className="kb__row">
                                <div className="kb__row__group reg-keys">
                                    <span className={currentlyPressed['Numpad4'] ? 'pressed' : ''}>4</span>
                                    <span className={currentlyPressed['Numpad5'] ? 'pressed' : ''}>5</span>
                                    <span className={currentlyPressed['Numpad6'] ? 'pressed' : ''}>6</span>
                                </div>
                            </div>
                            <div className="kb__row">
                                <div className="kb__row__group reg-keys">
                                    <span className={currentlyPressed['Numpad1'] ? 'pressed' : ''}>1</span>
                                    <span className={currentlyPressed['Numpad2'] ? 'pressed' : ''}>2</span>
                                    <span className={currentlyPressed['Numpad3'] ? 'pressed' : ''}>3</span>
                                </div>
                            </div>
                            <div className="kb__row">
                                <div className="kb__row__group reg-keys">
                                    <span className={currentlyPressed['Numpad0'] ? 'pressed fill-space' : 'fill-space'}>0</span>
                                    <span className={currentlyPressed['NumpadDecimal'] ? 'pressed' : ''}>.</span>
                                </div>
                            </div>
                        </div>
                        <div className="kb__numpad-tall">
                            <span className={`kb__numpadadd ${currentlyPressed['NumpadAdd'] ? 'pressed' : ''}`}>+</span>
                            <span className={`kb__numpadenter ${currentlyPressed['NumpadEnter'] ? 'pressed' : ''}`}>enter</span>
                        </div>
                    </div>
               </div>
            </div>
            <input className={`kb__input ${!allLoaded ? 'loading' : ''}`} ref={inp} />
            {/* <ul>
                {Object.keys(playingSrcs).map((k) => 
                    <li>Duration: {playingSrcs[k].source.buffer?.duration} | Gain:{playingSrcs[k].effectNode.gain.value}</li>
                )}
            </ul> */}
        </main>
    )
}