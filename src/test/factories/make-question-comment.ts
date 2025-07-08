import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment"
import { faker } from "@faker-js/faker"
export function makeQuestionComment(override: Partial<QuestionCommentProps>, id?: UniqueEntityId): QuestionComment {
  const questioncomment = QuestionComment.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return questioncomment
}
