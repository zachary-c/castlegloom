import { QuestionPrompt_t } from "$/schemaTypes/questionObjects/questionPrompt"
import { PortableText, PortableTextComponents } from "next-sanity"
import PromptImage from "./PromptImage"
import { randomInRange } from "@/poll/pollUtil"
import { professionList, qualifierList } from "../dash/types"

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

export function getRandomTitle(prevProf?: string, prevQualif?: string): [string, string] {
  while (true) {
    const randomProfession = professionList[randomInRange(0, professionList.length)]
    const randomQualifier = qualifierList[randomInRange(0, qualifierList.length)]
    if (randomProfession != prevProf && randomQualifier != prevQualif) {
      return [randomProfession, randomQualifier]
    }
  }
}
