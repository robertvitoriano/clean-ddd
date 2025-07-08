import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  content: string
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date 
}
export abstract class Comment<Props extends CommentProps> extends Entity<Props> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.update()
    this.props.content = content
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private update() {
    this.props.updatedAt = new Date()
  }
}
