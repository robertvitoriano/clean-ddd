import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "@/test/factories/make-question"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"
import { makeQuestionAttachment } from "@/test/factories/make-question-attachment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
let sut: DeleteQuestionUseCase
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  sut = new DeleteQuestionUseCase(questionsRepository)
})
describe("Delete question", () => {
  it("Should be able to Delete a question", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)
    
    await questionAttachmentsRepository.create(
      makeQuestionAttachment({
        attachmentId: new UniqueEntityId("1"),
        questionId: newQuestion.id,
      })
    )
    await questionAttachmentsRepository.create(
      makeQuestionAttachment({
        attachmentId: new UniqueEntityId("2"),
        questionId: newQuestion.id,
      })
    )
    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })
    
    const questionFound = await questionsRepository.findById(newQuestion.id.toString())
    const currentQuestionAttachments = await questionAttachmentsRepository.findManyByQuestionId(newQuestion.id.toValue())
    expect(currentQuestionAttachments).toHaveLength(0)
    expect(questionFound).toEqual(null)
  })
  it("Should not be  be able to Delete a question from another author", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "test",
    })

    expect(result.isFailure()).toBe(true)
  })
})
