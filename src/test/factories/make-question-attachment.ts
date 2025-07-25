import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment"
export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps>, id?: UniqueEntityId): QuestionAttachment {
  const questionattachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id
  )

  return questionattachment
}
