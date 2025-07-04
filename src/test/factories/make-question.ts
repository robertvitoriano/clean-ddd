import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"
import { faker } from "@faker-js/faker"
export function makeQuestion(override: Partial<QuestionProps>, id?: UniqueEntityId): Question {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      slug: Slug.create("example-title"),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )
  console.log(question)
  return question
}
