import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let sut: CreateQuestionUseCase
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  sut = new CreateQuestionUseCase(questionsRepository)
  
})
describe("Create question", () => {
  it("Should be able to create a question", async () => {
    const questionInfo = {
      authorId: "1",
      content: "some con",
      title: "title",
      attachmentIds:['1','2']
    }
    const answer = await sut.execute(questionInfo)

    expect(answer.value.question.authorId.toValue()).toEqual(questionInfo.authorId)
    expect(answer.value.question.title).toEqual(questionInfo.title)
    expect(answer.value.question.content).toEqual(questionInfo.content)
  })
})
