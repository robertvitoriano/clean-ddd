import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionRepository } from "../repositories/questions-repository"
import { FindQuestionBySlugUseCase } from "./find-question-by-slug"

let questionsRepository: IQuestionRepository
let sut: FindQuestionBySlugUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new FindQuestionBySlugUseCase(questionsRepository)
  
})
describe("Create question", () => {
  it("Should be able to get a question by slug", async () => {
    const slug = "questionInfo"
    const result = await sut.execute({slug})

    expect(result.question).toEqual(null)

  })
})
