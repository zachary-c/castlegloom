
export const RightArrow = ({ className, onClick } : { className? : string, onClick? : () => void}) => {
    return (
    <svg id="rightarrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1035" fill="currentColor"  className={className} onClick={onClick}>
        <path d="M395.49,823.49l201.9-189.45H47v-235.09h549.01l-199.14-188.08,164.57-165.94,471.57,471.57-471.57,472.95-165.94-165.94Z"/>
    </svg>
    )
}