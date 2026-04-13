
export function cleanSuggestedByComponent(name: string) {
	const trimmed = name.trim()
	const upperd = trimmed.toUpperCase()
	if (upperd.startsWith("THE") || upperd === "FORD") {
		return <b>{trimmed}</b>
	} else {
		return <>the <b>{trimmed}</b></>
	}
}
