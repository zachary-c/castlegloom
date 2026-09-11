"use client"

import { useState } from "react"
import { UserQuestionInfo } from "../dash/types"
import PollQuestionInput from "./PollQuestionInput"
import { UserContext } from "../dash/DashTabs"

export default function StandaloneInput({ question, userid }: { question: UserQuestionInfo, userid: string }) {
  const [clientQuestion, setClientQuestion] = useState<UserQuestionInfo>(question)

  return <UserContext.Provider value={userid}>
    <PollQuestionInput question={clientQuestion} setQuestion={setClientQuestion} />
  </UserContext.Provider>
}
