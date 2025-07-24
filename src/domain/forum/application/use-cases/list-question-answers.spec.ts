import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { makeAnswer } from "@/test/factories/make-answer"
import { ListQuestionAnswersUseCase } from "./list-question-answers"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"

let answersRepository: IAnswersRepository
let sut: ListQuestionAnswersUseCase
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  answersRepository = new InMemoryAnswersRepository()
  sut = new ListQuestionAnswersUseCase(questionsRepository, answersRepository)
})

describe("List question answers", () => {
  it("Should be able to list answers by question id", async () => {
    const question = makeQuestion({})
    await questionsRepository.create(question)
    
    for(let i = 0;i < 30;i++){
      await answersRepository.create(makeAnswer({questionId:question.id}))
    }
    const resultPage1 = await sut.execute({questionId:question.id.toValue(), page:1})
    expect(resultPage1.value.answers.length).to.equal(10)

  })
    it("Should throw an error if question do not exist", async () => {
    const question = makeQuestion({})
    
    for(let i = 0;i < 30;i++){
      await answersRepository.create(makeAnswer({questionId:question.id}))
    }
    const resultPage1 = await sut.execute({questionId:question.id.toValue(), page:1})
    
    expect(resultPage1.isFailure()).toBe(true)


  })
})
