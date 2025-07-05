import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ListRecentQuestionsCase } from "./list-recent-questions"
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
    expect(resultPage1.questions[0].id).to.not.equal(resultPage2.questions[0].id)

  })
  
  
    it("Should be ordered", async () => {
    for (let i = 0; i < 100; i++) {
      const question = makeQuestion({
        createdAt: new Date(Date.now() + i)
      })
      await questionsRepository.create(question)
    }
    let isOrdered = true
    const resultPage1 = await sut.execute({ page: 1 })
    
    resultPage1.questions.forEach((question, index)=>{
      const currentQuestionTime = question.createdAt.getTime()
      const beforeQuestionIndex = index > 0 ? index - 1 : 0
      const beforeQuestionTime = resultPage1.questions[beforeQuestionIndex].createdAt.getTime()
      if(index > 0 && currentQuestionTime  < beforeQuestionTime){
        isOrdered = false
      }
    })
    expect(isOrdered).toBe(true)

  })
})
