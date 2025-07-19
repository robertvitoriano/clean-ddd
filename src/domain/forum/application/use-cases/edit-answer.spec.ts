import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { IAnswersRepository } from "../repositories/answers-repository"
import { EditAnswerUseCase } from "./edit-answer"
import { makeAnswer } from "@/test/factories/make-answer"

let answersRepository: IAnswersRepository
let sut: EditAnswerUseCase
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  sut = new EditAnswerUseCase(answersRepository)
})
describe("Edit answer", () => {
  it("Should be able to Edit a answer", async () => {
    const newAnswer = makeAnswer({})
    await answersRepository.create(newAnswer)
    const updatedData = {
      answerId: newAnswer.id.toString(),
      content: "New content",
      title: "New title",
      authorId: newAnswer.authorId.toValue(),
    }
    await sut.execute(updatedData)
    const answerFound = await answersRepository.findById(newAnswer.id.toString())
    expect(answerFound?.content).toEqual(updatedData.content)
  })
  it("Should not be  be able to Edit a answer from another author", async () => {
    const newAnswer = makeAnswer({})
    await answersRepository.create(newAnswer)
    const updatedData = {
      answerId: newAnswer.id.toString(),
      content: "New content",
      authorId: "wrong author id",
    }
    const result = await sut.execute(updatedData)
    expect(result.isFailure()).toBe(true)
  })
})
