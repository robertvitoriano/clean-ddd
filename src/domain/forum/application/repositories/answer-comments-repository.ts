import { PaginationParams } from "@/core/repositories/pagination-params"
import { AnswerComment } from "../../enterprise/entities/answer-comment"

export interface IAnswerCommentsRepository {
  create: (answercomment: AnswerComment) => Promise<void>
  delete: (answercomment: AnswerComment) => Promise<void>
  save: (answercomment: AnswerComment) => Promise<void>
  findById: (answercommentId: string) => Promise<AnswerComment | null>
  findManyByAnswerId:(answerId:string, params:PaginationParams) => Promise<AnswerComment[]>
}
