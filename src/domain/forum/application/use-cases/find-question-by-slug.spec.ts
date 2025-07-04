import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionRepository } from "../repositories/questions-repository"
import { FindQuestionBySlugUseCase } from "./find-question-by-slug"
import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let questionsRepository: IQuestionRepository
let sut: FindQuestionBySlugUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new FindQuestionBySlugUseCase(questionsRepository)
})
describe("Create question", () => {
  it("Should be able to get a question by slug", async () => {
    const slug = Slug.create("Testing slug now")
    const question = Question.create({
      title: "Test title",
      content: "come testing content",
      slug,
      authorId: new UniqueEntityId(),
    })
    await questionsRepository.create(question)
    const result = await sut.execute({ slug: slug.value })

    expect(result.question?.slug.value).toEqual(slug.value)
  })
})
