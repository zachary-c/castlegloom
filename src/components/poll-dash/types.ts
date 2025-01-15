import { PollQuestion_t, PollResponse_t } from "$/types/documents"

export type UserQuestionInfo = PollQuestion_t & {
    userResponse?: string
}