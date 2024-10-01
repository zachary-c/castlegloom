import Link from "next/link";
import './spooktober/styles/daynav.scss'

interface DayNavigationProps {
    currentDay : number
    currentYear : number
    homepage? : boolean
}
const pathPrefix = '/spooktober'

export default function DayNavigation(props : DayNavigationProps) {
    let prevLink, nextLink;
    if (props.currentYear !== 2022 && props.currentDay === 1) {
        prevLink = `${pathPrefix}/${props.currentYear-1}/${32}`;
    } else {
        prevLink = `${pathPrefix}/${props.currentYear}/${props.currentDay-1}`;
    }
    //console.log("current day", props.currentDay);
    let tomorrow;
    if (props.currentDay === 32) {
        tomorrow = new Date(`${props.currentYear+1}-10-01`);
    } else if (props.currentDay === 31) {
        tomorrow = new Date(`${props.currentYear}-11-01`);
    } else {
        tomorrow = new Date(`${props.currentYear}-10-${props.currentDay + 1 < 10 ? '0' + (props.currentDay+1) : props.currentDay+1}`)
    }
    //console.log("tomorrow", tomorrow)
    //console.log(new Date(Date.now() - FIVE_HOURS_OF_MILLISECONDS))

    if (tomorrow <= new Date()) {
        if (props.currentYear !== new Date().getFullYear() && props.currentDay === 32) {
            nextLink = `${pathPrefix}/${props.currentYear+1}/${1}`;
        } else {
            nextLink = `${pathPrefix}/${props.currentYear}/${props.currentDay+1}`;
        }
        
    }
    
    return (
        <>
            <div className="daynav__container">
                {props.currentYear !== 2022 || props.currentDay !== 1 ?
                    <div className='daynav__button'>
                        <Link className="button" href={prevLink}>{"<"} Previous</Link>
                    </div> : null
                }

                {!(props.currentDay === 32 && props.currentYear === new Date().getFullYear()) && !props.homepage && nextLink ?
                    <div className='daynav__button'>
                        <Link className="button" href={nextLink}>Next {">"}</Link>
                    </div> : null
                }
            </div>
            {!props.homepage &&
                <div className='daynav__button'>
                    <Link className="button" href={pathPrefix}>Home</Link>
                </div>
            }
        </>
    )
}