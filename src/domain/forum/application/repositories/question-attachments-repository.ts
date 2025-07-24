import { PaginationParams } from "@/core/repositories/pagination-params"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"

export interface IQuestionAttachmentsRepository {
  create: (questionattachment: QuestionAttachment) => Promise<void>
  delete: (questionattachment: QuestionAttachment) => Promise<void>
  save: (questionattachment: QuestionAttachment) => Promise<void>
  findById: (questionattachmentId: string) => Promise<QuestionAttachment | null>
  findManyByQuestionId:(questionId:string) => Promise<QuestionAttachment[]>
}
