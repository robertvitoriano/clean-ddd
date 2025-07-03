import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"
interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props?.title
  }
  
  get content() {
    return this.props?.content
  }
  
  get authorId() {
    return this.props?.authorId
  }
  
  get bestAnswerId() {
    return this.props?.bestAnswerId
  }
  
  get slug() {
    return this.props?.slug
  }
  get createdAt() {
    return this.props?.createdAt
  }
  
  get updatedAt() {
    return this.props?.updatedAt
  }
  
  static create(props: Optional<QuestionProps, "createdAt">, id?: UniqueEntityId): Question {
    return new Question({ ...props, createdAt: new Date() }, id)
  }
}
