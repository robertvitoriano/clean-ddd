import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"

let questionsRepository: IQuestionsRepository
let sut: CreateQuestionUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new CreateQuestionUseCase(questionsRepository)
  
})
describe("Create question", () => {
  it("Should be able to create a question", async () => {
    const questionInfo = {
      authorId: "1",
      content: "some con",
      title: "title",
    }
    const answer = await sut.execute(questionInfo)

    expect(answer.question.authorId.toValue()).toEqual(questionInfo.authorId)
    expect(answer.question.title).toEqual(questionInfo.title)
    expect(answer.question.content).toEqual(questionInfo.content)
  })
})
