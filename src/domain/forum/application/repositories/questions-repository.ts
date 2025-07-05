import { Question } from "../../enterprise/entities/question"

export interface IQuestionRepository {
  create: (question: Question) => Promise<void>
  findBySlug: (slug: string) => Promise<Question | null>
  delete: (question: Question) => Promise<void>
  save: (question:Question) => Promise<void>
  findById: (questionId: string) => Promise<Question | null>
}
