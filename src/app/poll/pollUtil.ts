
export type Theme = 'november' | 'october-dark' | 'october-light' | 'wireframe' | 'january' | 'december-light' | 'december-dark' | 'february-light' | 'march-light' | 'march-dark'

export const theme : Theme = 'march-light'

export const STANDARDS = {
    white: '#fff',
    black: '#000' 
}
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
export const THEME_MARCH_LIGHT = {
    springGreen: '#92e464',
    bakerMiller: '#fa91b2',
    columbiaBlue: '#c4d1d7',
    officeGreen: '#276904',
    lapisLazuli: `#1f6898`,
    kellyGreen: '#40a505'
}

export const emailFrom = `Castle Gloom Census <${process.env.ORACLE_LOGIN}>`

export function randomInRange(min : number, max : number) {
    return Math.floor(Math.random() * max) + min; 
}
export const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
