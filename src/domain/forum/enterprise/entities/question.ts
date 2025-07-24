import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachment } from './question-attachment'
import { QuestionAttachmentList } from './question-attachment-list'
export interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityId
  attachments: QuestionAttachmentList
  bestAnswerId?: UniqueEntityId
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
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

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.update()
  }
  get bestAnswerId():UniqueEntityId | undefined{
    return this.props.bestAnswerId
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
  
  set attachments(attachments:QuestionAttachmentList){
    this.props.attachments = attachments
    
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ): Question {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
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
