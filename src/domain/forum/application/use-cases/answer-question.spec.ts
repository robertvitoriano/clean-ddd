import { AnswerQuestionUseCase } from "./answer-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"

let answersRepository: IAnswersRepository
let sut: AnswerQuestionUseCase
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  sut = new AnswerQuestionUseCase(answersRepository)
})
describe("Create an answer", () => {
  it("Should be able to create an answer", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova resposta",
    })

    expect(result.answer.content).toEqual("Nova resposta")
  })
})
