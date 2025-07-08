import { PaginationParams } from "@/core/repositories/pagination-params"
import { AnswerComment } from "../../enterprise/entities/answer-comment"

export interface IAnswerCommentsRepository {
  create: (answercomment: AnswerComment) => Promise<void>
  findBySlug: (slug: string) => Promise<AnswerComment | null>
  delete: (answercomment: AnswerComment) => Promise<void>
  save: (answercomment: AnswerComment) => Promise<void>
  findById: (answercommentId: string) => Promise<AnswerComment | null>
  findManyRecent:(params:PaginationParams) => Promise<AnswerComment[]>
}
