import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { FindQuestionBySlugUseCase } from "./find-question-by-slug"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { makeQuestion } from "@/test/factories/make-question"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let sut: FindQuestionBySlugUseCase
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  sut = new FindQuestionBySlugUseCase(questionsRepository)
})
describe("Create question", () => {
  it("Should be able to get a question by slug", async () => {
    const question = makeQuestion({
      slug:Slug.create("testing-slug")
    })
    await questionsRepository.create(question)
    const result = await sut.execute({ slug: question.slug.value })

    expect(result.value.question?.slug.value).toEqual(question.slug.value)
  })
})
