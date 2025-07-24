import { PaginationParams } from "@/core/repositories/pagination-params"
import { IQuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository"
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment"

export class InMemoryQuestionAttachmentsRepository implements IQuestionAttachmentsRepository {
  async findManyByQuestionId (questionId: string):Promise<QuestionAttachment[]>{
    return this.questionAttachments
      .filter(q => q.questionId.toString() ===questionId)
  }
  public questionAttachments: QuestionAttachment[] = []
  async create(questionAttachment: QuestionAttachment): Promise<void> {
    this.questionAttachments.push(questionAttachment)
  }
  async delete(questionAttachment: QuestionAttachment): Promise<void> {
    const questionAttachmentIndex = this.questionAttachments.findIndex(
      (item) => item.id.toValue() === questionAttachment.id.toValue()
    )
    this.questionAttachments.splice(questionAttachmentIndex, 1)
  }
  async findById(questionattachmentId: string): Promise<QuestionAttachment | null> {
    return (
      this.questionAttachments.find(
        (questionAttachment) => questionAttachment.id.toValue() === questionattachmentId
      ) || null
    )
  }
  save!: (questionattachment: QuestionAttachment) => Promise<void>
  findManyRecent!: (params: PaginationParams) => Promise<QuestionAttachment[]>
}
