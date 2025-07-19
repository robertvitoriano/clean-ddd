import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { IAnswersRepository } from "../repositories/answers-repository"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository"
import { makeAnswer } from "@/test/factories/make-answer"
import { ListAnswerCommentsUseCase } from "./list-anwer-comments"
import { makeAnswerComment } from "@/test/factories/make-anwer-comment"

let answersRepository: IAnswersRepository
let answerCommentRepository: IAnswerCommentsRepository
let sut: ListAnswerCommentsUseCase

beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  answerCommentRepository = new InMemoryAnswerCommentsRepository()
  sut = new ListAnswerCommentsUseCase(answersRepository, answerCommentRepository)
})

describe("List answer comments", () => {
  it("Should be able to list comments by answer id", async () => {
    const answer = makeAnswer({})
    await answersRepository.create(answer)

    for (let i = 0; i < 30; i++) {
      await answerCommentRepository.create(makeAnswerComment({ answerId: answer.id }))
    }
    const resultPage1 = await sut.execute({answerId:answer.id.toValue(), page:1})
    expect(resultPage1.value.comments.length).to.equal(10)
    const resultPage2 = await sut.execute({answerId:answer.id.toValue(), page:3})
    expect(resultPage2.value.comments.length).to.equal(10)
    const resultPage3 = await sut.execute({answerId:answer.id.toValue(), page:4})
    expect(resultPage3.value.comments.length).to.equal(0)
  })
  it("Should throw an error if answer do not exist", async () => {
    const answer = makeAnswer({})

    for (let i = 0; i < 30; i++) {
      await answerCommentRepository.create(makeAnswerComment({ answerId: answer.id }))
    }
    const result = await sut.execute({answerId:answer.id.toValue(), page:1})
    
    expect(result.isFailure()).toBe(true)
  })
})
