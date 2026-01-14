import { QuestionPrompt_t } from "$/schemaTypes/questionObjects/questionPrompt"
import { PortableText, PortableTextComponents } from "next-sanity"
import PromptImage from "./PromptImage"

export const additionalBlocks: PortableTextComponents = {
	types: {
		qpImage: PromptImage
	},
}

export function renderPrompt(qp?: QuestionPrompt_t) {
	if (qp?.promptType == "plainText") {
		return <>{qp.plaintextQuestionPrompt}</>
	} else if (qp?.promptType == "richText") {
		return <PortableText value={qp.richTextPrompt} components={additionalBlocks} />
	}

	return <></>
}
