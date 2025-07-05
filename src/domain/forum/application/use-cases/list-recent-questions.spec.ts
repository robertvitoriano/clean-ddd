import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ListRecentQuestionsCase } from "./list-recent-questions"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { makeQuestion } from "@/test/factories/make-question"

let questionsRepository: IQuestionsRepository
let sut: ListRecentQuestionsCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new ListRecentQuestionsCase(questionsRepository)
})
describe("Create question", () => {
  it("Should be able to get a question by slug", async () => {
    for (let i = 0; i < 100; i++) {
      const question = makeQuestion({})
      await questionsRepository.create(question)
    }
    const resultPage1 = await sut.execute({ page: 1 })
    const resultPage2 = await sut.execute({ page: 2 })
    expect(resultPage1.questions.length).to.equal(10)
    expect(resultPage2.questions.length).to.equal(10)
  })
})
