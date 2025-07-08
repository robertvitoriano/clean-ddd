import { PaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "../../enterprise/entities/question-comment"

export interface IQuestionCommentsRepository {
  create: (questioncomment: QuestionComment) => Promise<void>
  findBySlug: (slug: string) => Promise<QuestionComment | null>
  delete: (questioncomment: QuestionComment) => Promise<void>
  save: (questioncomment: QuestionComment) => Promise<void>
  findById: (questioncommentId: string) => Promise<QuestionComment | null>
  findManyRecent:(params:PaginationParams) => Promise<QuestionComment[]>
}
