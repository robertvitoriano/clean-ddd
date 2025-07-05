import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { FindQuestionBySlugUseCase } from "./find-question-by-slug"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { makeQuestion } from "@/test/factories/make-question"

let questionsRepository: IQuestionsRepository
let sut: FindQuestionBySlugUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new FindQuestionBySlugUseCase(questionsRepository)
})
describe("Create question", () => {
  it("Should be able to get a question by slug", async () => {
    const question = makeQuestion({
      slug:Slug.create("testing-slug")
    })
    await questionsRepository.create(question)
    const result = await sut.execute({ slug: question.slug.value })

    expect(result.question?.slug.value).toEqual(question.slug.value)
  })
})
