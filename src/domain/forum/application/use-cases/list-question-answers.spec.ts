import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { Answer } from "../../enterprise/entities/answer"
import { makeAnswer } from "@/test/factories/make-answer"
import { ListQuestionAnswersUseCase } from "./list-question-answers"

let questionsRepository: IQuestionsRepository
let answersRepository: IAnswersRepository
let sut: ListQuestionAnswersUseCase

beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
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
    const resultPage1 = await sut.execute(question.id.toValue(), 1)
    expect(resultPage1.answers.length).to.equal(10)

  })
    it("Should throw an error if question do not exist", async () => {
    const question = makeQuestion({})
    
    for(let i = 0;i < 30;i++){
      await answersRepository.create(makeAnswer({questionId:question.id}))
    }
    await expect(sut.execute(question.id.toValue(), 1)).rejects.toThrowError()

  })
})
