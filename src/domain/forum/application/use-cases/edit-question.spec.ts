import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "@/test/factories/make-question"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestionAttachment } from "@/test/factories/make-question-attachment"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"

let sut: EditQuestionUseCase
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()

  sut = new EditQuestionUseCase(questionsRepository, questionAttachmentsRepository)
})
describe("Edit question", () => {
  it("Should be able to Edit a question", async () => {
    const newQuestion = makeQuestion({})
    await questionsRepository.create(newQuestion)
    
    await questionAttachmentsRepository.create(
      makeQuestionAttachment({
        attachmentId: new UniqueEntityId('1'),
        questionId: newQuestion.id
      })
    )
    await questionAttachmentsRepository.create(
      makeQuestionAttachment({
        attachmentId: new UniqueEntityId('2'),
        questionId: newQuestion.id
      })
    )
    const updatedData = {
      questionId: newQuestion.id.toString(),
      content: "New content",
      title: "New title",
      authorId: newQuestion.authorId.toValue(),
      attachmentIds: ["1", "2"],
    }
    await sut.execute(updatedData)
    const questionFound = await questionsRepository.findById(newQuestion.id.toString())
    const currentQuestionAttachments = await questionAttachmentsRepository.findManyByQuestionId(newQuestion.id.toValue())
    expect(currentQuestionAttachments).toEqual([
      expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
      expect.objectContaining({attachmentId: new UniqueEntityId('2')})
    ])
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
      attachmentIds: [],
    }
    const result = await sut.execute(updatedData)

    expect(result.isFailure()).toBe(true)
  })
})
