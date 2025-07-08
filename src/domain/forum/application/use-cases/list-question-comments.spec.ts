import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { ListQuestionCommentsUseCase } from "./list-question-comment"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { makeQuestionComment } from "@/test/factories/make-question-comment"

let questionsRepository: IQuestionsRepository
let questionCommentRepository: IQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
  questionCommentRepository = new InMemoryQuestionCommentsRepository()
  sut = new ListQuestionCommentsUseCase(questionsRepository, questionCommentRepository)
})

describe("List question comments", () => {
  it("Should be able to list comments by question id", async () => {
    const question = makeQuestion({})
    await questionsRepository.create(question)
    
    for(let i = 0;i < 30;i++){
      await questionCommentRepository.create(makeQuestionComment({questionId:question.id}))
    }
    const resultPage1 = await sut.execute(question.id.toValue(), 1)
    expect(resultPage1.comments.length).to.equal(10)

  })
    it("Should throw an error if question do not exist", async () => {
    const question = makeQuestion({})
    
    for(let i = 0;i < 30;i++){
      await questionCommentRepository.create(makeQuestionComment({questionId:question.id}))
    }
    await expect(sut.execute(question.id.toValue(), 1)).rejects.toThrowError()

  })
})
