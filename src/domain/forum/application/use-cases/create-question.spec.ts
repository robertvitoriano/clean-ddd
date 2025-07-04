import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"

let questionsRepository: IQuestionRepository
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
})
describe("Create question", () => {
  it("Should be able to create a question", async () => {
    const createQuestion = new CreateQuestionUseCase(questionsRepository)
    const questionInfo = {
      authorId: "1",
      content: "some con",
      title: "title",
    }
    const answer = await createQuestion.execute(questionInfo)

    expect(answer.question.authorId.toValue()).toEqual(questionInfo.authorId)
    expect(answer.question.title).toEqual(questionInfo.title)
    expect(answer.question.content).toEqual(questionInfo.content)
  })
})
