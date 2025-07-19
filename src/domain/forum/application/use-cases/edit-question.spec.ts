import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "@/test/factories/make-question"

let questionsRepository: IQuestionsRepository
let sut: EditQuestionUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  sut = new EditQuestionUseCase(questionsRepository)
})
describe("Edit question", () => {
  it("Should be able to Edit a question", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)
    const updatedData = {
      questionId: newQuestion.id.toString(),
      content: "New content",
      title: "New title",
      authorId: newQuestion.authorId.toValue(),
    }
    await sut.execute(updatedData)
    const questionFound = await questionsRepository.findById(newQuestion.id.toString())
    expect(questionFound?.title).toEqual(updatedData.title)
    expect(questionFound?.content).toEqual(updatedData.content)
  })
  it("Should not be  be able to Edit a question from another author", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)
    const updatedData = {
      questionId: newQuestion.id.toString(),
      content: "New content",
      title: "New title",
      authorId: "wrong author id",
    }
    const result = await sut.execute(updatedData)
    
    expect(result.isFailure()).toBe(true)
  })
})
