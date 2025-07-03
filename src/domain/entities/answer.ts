import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"
interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerProps> {
  static create(props: Optional<AnswerProps, "createdAt">, id?: UniqueEntityId): Answer {
    return new Answer({ ...props, createdAt: new Date() }, id)
  }
  
  get content() {
    return this.props.content
  }
  
  get authorId() {
    return this.props.authorId
  }
  
  get questionId() {
    return this.props.questionId
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...")
  }
}
