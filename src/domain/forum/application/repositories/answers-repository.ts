import { Answer } from "../../enterprise/entities/answer"

export interface IAnswersRepository {
  create: (answer: Answer) => Promise<void>
  findById: (answerId: string) => Promise<Answer | null>
  delete: (answer: Answer) => Promise<void>
}
