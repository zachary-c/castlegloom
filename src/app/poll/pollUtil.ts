
export type Theme = 'november' | 'october-dark' | 'october-light' | 'wireframe' | 'january' | 'december-light' | 'december-dark' | 'february-light'

export const theme : Theme = 'february-light'

// January Theme Colors
export const THEME_JAN = {
    walnutBrown: "#5c574f",
    blackOlive: "#48483a",
    jasper: "#d66853",
    bone: "#d1d3c4",
    platinum: "#dfe0dc",
}

export const THEME_FEB_LIGHT = {
    blush: '#db5375',
    snow: '#f7f0f0',
    electricBlue: '#8af3ff',
    chefchaouenBlue: '#3f8efc',
    prussianBlue: `#0b3142`,
    uranianBlue: '#b1ddf2'
}

export const emailFrom = `Castle Gloom Census <${process.env.ORACLE_LOGIN}>`

export function randomInRange(min : number, max : number) {
    return Math.floor(Math.random() * max) + min; 
}
export const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
