import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "@/test/factories/make-question"

let questionsRepository: IQuestionsRepository
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

    const result =  await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: "test",
      })
      
    expect(result.isFailure()).toBe(true)
  })
})
