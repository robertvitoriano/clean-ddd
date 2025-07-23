import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
interface AnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}
export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId
  }
  get answerId() {
    return this.props.answerId
  }
  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const answerattachment = new AnswerAttachment(props, id)

    return answerattachment
  }
}
