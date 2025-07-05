import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { IAnswersRepository } from "../repositories/answers-repository"
import { DeleteAnswerUseCase } from "./delete-answer"
import { Answer } from "../../enterprise/entities/answer"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeAnswer } from "@/test/factories/make-answer"
// import { makeAnswer } from "@/test/factories/make-answer"

let answersRepository: IAnswersRepository
let sut: DeleteAnswerUseCase
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  sut = new DeleteAnswerUseCase(answersRepository)
})
describe("Delete answer", () => {
  it("Should be able to Delete a answer", async () => {
    const newAnswer = makeAnswer({})
    await answersRepository.create(newAnswer)
    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    })
    const answerFound = await answersRepository.findById(newAnswer.id.toString())
    expect(answerFound).toEqual(null)
  })
  it("Should not be  be able to Delete a answer from another author", async () => {
    const newAnswer = makeAnswer({})
    await answersRepository.create(newAnswer)

    expect(async () => {
      return await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: "test",
      })
    }).rejects.toThrowError()
  })
})
