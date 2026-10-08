"use client"

import { useState } from "react"
import { UserQuestionInfo } from "../dash/types"
import PollQuestionInput from "./PollQuestionInput"
import { UserContext } from "../dash/DashTabs"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

export default function StandaloneInput({ question, userid }: { question: UserQuestionInfo, userid: RequestCookie | undefined }) {
  const [clientQuestion, setClientQuestion] = useState<UserQuestionInfo>(question)

  return <UserContext.Provider value={userid?.value ?? null}>
    <PollQuestionInput question={clientQuestion} setQuestion={setClientQuestion} />
  </UserContext.Provider>
}
