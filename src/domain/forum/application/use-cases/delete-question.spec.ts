import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionRepository } from "../repositories/questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "@/test/factories/make-question"

let questionsRepository: IQuestionRepository
let sut: DeleteQuestionUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new DeleteQuestionUseCase(questionsRepository)
})
describe("Delete question", () => {
  it("Should be able to Delete a question", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)
    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })
    const questionFound = await questionsRepository.findById(newQuestion.id.toString())
    expect(questionFound).toEqual(null)
  })
  it("Should not be  be able to Delete a question from another author", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)

    expect(async () => {
      return await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: "test",
      })
    }).rejects.toThrowError()
  })
})
