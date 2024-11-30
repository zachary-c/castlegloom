'use client'
import "&/stratRoulette.scss"
import { useEffect, useMemo, useState } from "react";

type MapData = {
    name : string
    slug : string
}
type Strat = {
    title : string
    description : string
    side? : Side
    round? : Round
}
type Side = "T" | "CT" | undefined;
type Round = "Pistol" | "Gun" | undefined
const sides : Side[] = ["CT", "T", undefined]
const round_types : Round[] = ['Pistol', "Gun", undefined]
const strats : Strat[] = [
    {
        title: 'Go Go Go',
        description: 'Hold W.',
    },
    {
        title: "The Tank",
        description: "Pair up. One buy a sniper, the other nothing. The sniper may only shoot stacked atop their partner. Any odd man out follows a pair making tank noises.",
        round: 'Gun'
    },
    {
        title: "We're Oscar Mike",
        description: "You are only allowed to move if your knife is out."
    },
    {
        title: "The Marksman",
        description: "All buy scouts, have to stay scoped in at all times except to throw nades.",
        round: 'Gun'
    },
    {
        title: "The Nathan",
        description: "You must speak only with your lips closed for the duration of the round."
    },
    {
        title: "Towers",
        description: "You're only allowed to shoot from atop another player's head."
    },
    {
        title: "Relay Race",
        description: "All but one player stays in spawn; the runner must complete a full lap of the map holding down W; can shoot along the way but can't stop moving. Once they make it back the next person goes. Repeat until the relay is complete."
    },
    {
        title: "Spinbot",
        description: "Up sensitivity to 10,000. Buy Scouts and Deagles and have fun.",
        round: 'Gun'
    },
    {
        title: "Moment of Silence",
        description: "Stay in spawn for 45 seconds after the start of the round."
    },
    {
        title: "The Wild West",
        description: "You may only use R8s, Novas, and Sawed-Offs for this round.",
        round: 'Gun'
    },
    {
        title: "Skins = Skill",
        description: "You must buy whatever gun has the coolest skin. If you see a cooler skin on the ground, you must pick it up and use that instead.",
    },
    {
        title: "We Could Only Afford One",
        description: "Only one person may buy a gun this round; other team members must throw their secondaries away.",
        round: 'Gun'
    },
    {
        title: "Splatoon 1.6",
        description: "Everyone buy a smoke. You may only stop holding W if you're in a smoke."
    },
    {
        title: "Solid Snake",
        description: "Everyone buy a smoke. Throw one mid, whole team sits inside. Re-smoke your hiding spot until you run out of smokes."
    },
    {
        title: "This is the Killing House",
        description: "Hold W, find a spot to stand. Once you stop, you can't move for the rest of the round"
    },
    {
        title: "No Strafing",
        description: "You aren't allowed to press A or D this round."
    },
    {
        title: "To the Left To the Left",
        description: "You aren't allowed to press W or S this round."
    },
    {
        title: "Too much for zblock",
        description: "You're only allowed to move by bunnyhopping this round."
    },
    {
        title: "Jeopardy",
        description: "All callouts must be phrased as questions."
    },
    {
        title: "Tag",
        description: "The bottom frag is it. if he touches you, you're it. Whomever is it is playing tag; everyone else is playing Counterstrike."
    },
    {
        title: "Static Shock",
        description: "You have to get a Zeus kill before you may use any other weapons"
    },
    {
        title: "The Floor is Lava",
        description: "You must be on boxes/geometry; you may only run 5 seconds at a time before getting on something that is not the floor. If you fail, you must run back to where you were last off the lava."
    },
    {
        title: "Nadeking",
        description: "Nade stack B."
    },
    {
        title: "I am the WarOwl",
        description: "Before you flick and shoot, first you have to <i>stop</i>. You can only shoot after strafing and then counterstrafing."
    },
    {
        title: "DOOR STUCK",
        description: "Find a door and wedge yourself in it, then attempt to defend yourself from the enemy."
    },
    {
        title: "Group Therapy",
        description: "Before you can leave spawn, you must type a specific compliment to a member of the enemy team."
    },
    {
        title: "Get Down Mr. President",
        description: "Your bottom frag is the president. You aren't allowed to go more than 10 meters away from the president, but if the president dies you must throw the round."
    },
    {
        title: "They'll Never Expect This",
        description: "Come up with a specific plan for this round, and then type it into the match chat."
    },
    {
        title: "Good Soldiers Follow Orders",
        description: "One player is the commander and must issue movement & shooting commands to the team. Other players are not allowed to act unless ordered to do so."
    },
    {
        title: "Are we blind?",
        description: "Everyone buy a decoy, and throw them all at different parts of the map.",
    },
    {
        title: "Utility Value",
        description: "Everyone buy four grenades; if you don't use all 4, instead of doing next round's strat you must shift-walk around the map looking at the ground and type \"I am a dunce who didn't use my utility\" every 10 seconds.",
        round: "Gun"
    },
    {
        title: "Glass Houses",
        description: "No one may buy armor or helmet. You must purchase the most expensive weapon you can.",
        round: "Gun",
    },
    {
        title: "Kevlar",
        description: "Buy kevlar.",
        round: "Pistol"
    },
    {
        title: "Red Light Green Light",
        description: "You are now playing Red Light Green Light. The bottom frag decides if you move or not."
    },
    {
        title: "Criss Cross! Reverse! Reverse!",
        description: "Cross your arms and play with right hand on keyboard, left hand on mouse."  
    },
    {
        title: "He's 1hp",
        description: "You aren't allowed to say any true statements this round."
    },
    {
        title: "Hudson Keyboard",
        description: "You must jump and land before every spray/shot."
    },
    {
        title: "Generosity",
        description: "Buy your most hated gun and give it to a teammate",
        round: 'Gun'
    },
    {
        title: "MLG Pro",
        description: "Use precision semi-automatic weapons and do a 360 anytime you miss a shot."
    },
    {
        title: "Highlights",
        description: "Buy snipers, all shots must be 360 noscopes.",
        round: 'Gun'
    },
    {
        title: "Peekaboo",
        description: "You may only open your eyes while standing still."
    },
    {
        title: "Hey Now",
        description: "As a team, sing 'All Star' one line at a time in scoreboard order."
    },
    {
        title: "Small Talk",
        description: "Dead players must talk loudly about something utterly unrelated to the game. If only one person is dead, they must sing."
    },
    {
        title: "The Zach Special",
        description: "Take off your headset, turn it around, and put it on backwards."
    },
    {
        title: "MVP",
        description: "Play this round like normal. The MVP (or last man alive) is your celebrity player for the next round. You must compliment them constantly and aren't allowed to say any callouts without a compliment. Do what they say also."
    },
    {
        title: "Gun Game",
        description: "If you kill a player, you must collect their gun and use it for the remainder of the round."
    },
    {
        title: "COD Reload",
        description: "You must reload after <i>every</i> shot."
    },/* 
    {
        title: "",
        description: "There "
    }, */
    /* 
    {
        title: "Karaoke",
        description: ""
    }, */
/*     {
        title: "Indian Tech Support",
        description: "One person is Indian Tech Support and stays in spawn. The rest of the team plays as normal but you must roleplay calling indian tech support through in-game voice "
    }
 */
    // CT-side
    {
        title: "Loud & Proud",
        description: "You must use guns that have suppressors but with the suppressors off.",
        side: "CT"
    },
    {
        title: "They Call Me Juan",
        description: "Buy Deagles & hold Mid until the bomb is planted.",
        side: "CT"
    },
    {
        title: "A Quiet Place",
        description: "You must walk, crouch jump, and use suppressed weapons. No noise.",
        side: "CT"
    },
    {
        title: "Do Not Stop My Friends",
        description: "Rush B.",
        side: "CT"
    },
    {
        title: "Patrol Command",
        description: "You must run repeatedly back and forth between bombsites, shooting at anyone you see along the way.",
        side: "CT"
    },
    {
        title: "This is still T-side, right?",
        description: "Unsuppress your USPs and rush.",
        side: "CT",
        round: "Pistol"
    },
    {
        title: "Look Ma",
        description: "Buy deagles, and any time you get a kill you must inspect spam until you get the rare animation. Watch it entirely, and then continue the game.",
        side: "CT",
        round: "Pistol"
    },
    {
        title: "SWAG-7",
        description: "MAG-7 and knives only this round.",
        side: "CT",
        round: 'Gun'
    },

    // T-side
    {
        title: "Mortar Strike",
        description: "Buy Molotovs, HEs, and 2 flashbangs. Everyone must unload all utility onto the site before any player may enter.",
        side: "T",
        round: 'Gun'
    },
    {
        title: "A Normal A Execute",
        description: "Full buy and use util to take the A site.",
        side: "T",
        round: 'Gun'
    },
    {
        title: "RACETRACK",
        description: "Run the racetrack with SMGs while making racecar noises.",
        side: "T",
        round: 'Gun'
    },
    {
        title: "Tony Hawk",
        description: "Buy an AK, drop it on the ground. You're not allowed to leave spawn until you successfully kickflip it.",
        side: "T",
        round: 'Gun'
    },
    {
        title: "Inside Man",
        description: "Send a lurk to hang out behind enemy lines and pretend to be a CT.",
        side: "T"
    },
    {
        title: "Glomck",
        description: "Burst mode glocks only.",
        side: "T",
        round: "Pistol"
    },
    {
        title: "Graffiti",
        description: "You must get to CT spawn and place your spray in an obvious place before planting the bomb.",
        side: "T"
    },
]
const maps : MapData[] = [
    {
        name: 'Mirage',
        slug: 'mirage',
    },
    {
        name: 'Dust 2',
        slug: 'dust-2'
    },
    {
        name: 'Inferno',
        slug: 'inferno'
    },
    {
        name: 'Train',
        slug: 'train'
    },
    {
        name: 'Vertigo',
        slug: 'vertigo'
    },
    {
        name: 'Anubis',
        slug: 'anubis'
    },
    {
        name: 'Ancient',
        slug: 'ancient'
    },
    {
        name: 'Nuke',
        slug: 'nuke'
    },
    {
        name: 'None',
        slug: 'none'
    }
]

function rand(min : number, max :number) {
    return Math.floor(Math.random()*(max-min))+min
}

export default function StratRoulette() {
    const [map, setMap] = useState<string>("none")
    const [round, setRound] = useState<Round>(undefined)
    const [side, setSide] = useState<Side>(undefined)
    const [strat, setStrat] = useState<Strat | undefined>(undefined)
    const [avoidRepeatFor, setAvoidRepeatFor] = useState<number>(3)
    const [lastStrats, setLastStrats] = useState<string[]>([])
    const stratPool = useMemo<Strat[]>(() => {
        return strats.filter((s) => (!s.side || side === s.side) && (!s.round || round === s.round))
    }, [side, round])

    function generate() {
        let newStrat;
        do {
            newStrat = stratPool[rand(0, stratPool.length)]
        } while (lastStrats.includes(newStrat.title)) 
        console.log("stratPool size", stratPool.length)
        console.log("lastStrats", lastStrats)
        setStrat(newStrat)
        
        setLastStrats([...(lastStrats.length > avoidRepeatFor-1 ? lastStrats.slice(1) : lastStrats), newStrat.title])
    }
    useEffect(() =>{
        setLastStrats(lastStrats => [...lastStrats.slice(0, avoidRepeatFor)])
    }, [avoidRepeatFor])
    useEffect(() => {
        setAvoidRepeatFor(Math.min(avoidRepeatFor, stratPool.length-1))
    }, [stratPool])

    return (
        <>
            <h1>CS2 Strat Roulette</h1>
            <div className="sr__selections">
                <div className="sr__selections__side choice">
                    <ul >
                        {sides.map((s, i) => 
                            <li key={i} className={`${s === side ? 'selected' : ''}`}>
                                <button onClick={() => setSide(s)}>
                                    {s ?? "Non-specific"}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="sr__selections__round choice">
                    <ul >
                        {round_types.map((s, i) => 
                            <li key={i} className={`${s === round ? 'selected' : ''}`}>
                                <button onClick={() => setRound(s)}>
                                    {s ?? 'Non-specific'}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="sr__repeat-count">
                <label>Avoid repeating for</label>
                <input value={avoidRepeatFor} type="number" onChange={(e) => setAvoidRepeatFor(Math.min(stratPool.length-1, parseInt(e.target.value)))}/>
                <label>Strats</label>
            </div>
            {/* <div className="sr__map-select">
                <h2>Choose Map:</h2>
                <ul>
                {maps.map((m, i) => 
                    <li key={i} className={`${m.slug === map ? 'selected' : ''}`}>
                        <button onClick={() => setMap(m.slug)}>
                            {m.name}
                        </button>
                    </li>
                )}
                </ul>
            </div> */}
            <div className="sr__generate">
                <button onClick={generate}>
                    Strategize
                </button>
            </div>
            <div className={`sr__output ${!!strat ? '' : ''}`}>
                <div className="sr__output__box">
                    <h2>{strat?.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: strat?.description ?? ''}}></p>
                </div>
            </div>
        </>
    )
}