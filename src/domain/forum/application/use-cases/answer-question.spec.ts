import { AnswerQuestionUseCase } from "./answer-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"

let answersRepository: IAnswersRepository
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
})
describe("Create an answer", () => {
  it("Should be able to create an answer", () => {
    const answerQuestion = new AnswerQuestionUseCase(answersRepository)
    const answer = answerQuestion.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova resposta",
    })

    expect(answer.content).toEqual("Nova resposta")
  })
})
