import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"
import { faker } from "@faker-js/faker"
export function makeAnswer(override: Partial<AnswerProps>, id?: UniqueEntityId): Answer {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )
  console.log(answer)
  return answer
}
