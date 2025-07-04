import { Slug } from '@/domain/entities/value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
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

  set title(title: string) {
    this.props.slug = Slug.createFromText(title)
    this.props.title = title
  }

  set content(content: string) {
    this.props.content = content
  }

  get authorId() {
    return this.props?.authorId
  }

  get bestAnswerId() {
    return this.props?.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.update()
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

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ): Question {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
  }

  private update() {
    this.props.updatedAt = new Date()
  }

  get excerpt() {
    this.update()
    return this.content.substring(0, 120).trimEnd().concat('...')
  }
}
