import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ListRecentQuestionsCase } from "./list-recent-questions"
import { makeQuestion } from "@/test/factories/make-question"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let sut: ListRecentQuestionsCase
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
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
    expect(resultPage1?.value?.questions.length).to.equal(10)
    expect(resultPage2?.value?.questions.length).to.equal(10)
    expect(resultPage1?.value?.questions[0].id).to.not.equal(resultPage2?.value?.questions[0].id)
  })

  it("Should be ordered", async () => {
    for (let i = 0; i < 10; i++) {
      const question = makeQuestion({
        createdAt: new Date(Date.now() + i),
      })
      await questionsRepository.create(question)
    }
    const resultPage1 = await sut.execute({ page: 1 })

    const isOrdered = resultPage1?.value?.questions.every((question, index, arr) => {
      if (index === 0) return true
      return arr[index - 1].createdAt.getTime() <= question.createdAt.getTime() 
    })
    
    expect(isOrdered).toBe(true)
  })
})
