import { PaginationParams } from "@/core/repositories/pagination-params"
import { Question } from "../../enterprise/entities/question"

export interface IQuestionsRepository {
  create: (question: Question) => Promise<void>
  findBySlug: (slug: string) => Promise<Question | null>
  delete: (question: Question) => Promise<void>
  save: (question: Question) => Promise<void>
  findById: (questionId: string) => Promise<Question | null>
  findManyRecent:(params:PaginationParams) => Promise<Question[]>
}
