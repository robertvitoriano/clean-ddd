import { PaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "../../enterprise/entities/question-comment"

export interface IQuestionCommentsRepository {
  create: (questioncomment: QuestionComment) => Promise<void>
  delete: (questioncomment: QuestionComment) => Promise<void>
  save: (questioncomment: QuestionComment) => Promise<void>
  findById: (questioncommentId: string) => Promise<QuestionComment | null>
  findManyByQuestionId:(questionId:string ,params:PaginationParams) => Promise<QuestionComment[]>
}
