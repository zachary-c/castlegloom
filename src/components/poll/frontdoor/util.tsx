import { QuestionPrompt_t } from "$/schemaTypes/questionObjects/questionPrompt"
import { PortableText } from "next-sanity"

export function renderPrompt(qp?: QuestionPrompt_t) {
	console.log("rendering", qp)
	if (qp?.promptType == "plainText") {
		return <>{qp.plaintextQuestionPrompt}</>
	} else if (qp?.promptType == "richText") {
		return <PortableText value={qp.richTextPrompt} />
	}

	return <></>
}
