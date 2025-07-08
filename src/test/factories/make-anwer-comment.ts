import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment"
import { faker } from "@faker-js/faker"
export function makeAnswerComment(override: Partial<AnswerCommentProps>, id?: UniqueEntityId): AnswerComment {
  const answercomment = AnswerComment.create(
    {
      answerId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return answercomment
}
