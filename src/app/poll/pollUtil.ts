import { Theme } from "R/src/components/PollQuestion";

export const theme : Theme = 'january'

// January Theme Colors
export const THEME_JAN = {
    walnutBrown: "#5c574f",
    blackOlive: "#48483a",
    jasper: "#d66853",
    bone: "#d1d3c4",
    platinum: "#dfe0dc",
}

export const emailFrom = `Castle Gloom Census <${process.env.ORACLE_LOGIN}>`

export function randomInRange(min : number, max : number) {
    return Math.floor(Math.random() * max) + min; 
}
export const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
