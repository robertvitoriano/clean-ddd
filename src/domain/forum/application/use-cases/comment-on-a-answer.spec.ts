import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { IAnswersRepository } from "../repositories/answers-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { makeAnswer } from "@/test/factories/make-answer"
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/answer-comments-repository"


let answersRepository: IAnswersRepository
let answerCommentsRepository: IAnswerCommentsRepository
let sut: CommentOnAnswerUseCase
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  answerCommentsRepository = new InMemoryAnswerCommentsRepository()
  
  sut = new CommentOnAnswerUseCase(answersRepository, answerCommentsRepository)
  
})
describe("COmment on a answer", () => {
  it("SHould be able to comment on a answer ", async () => {
    const answer = makeAnswer({})
    await answersRepository.create(answer)
    const commentInfo = {
      authorId:'myid',
      content:'first comment',
      answerId: answer.id.toValue(),
    }
    const {answerComment }= await sut.execute(commentInfo)

    expect(answerComment.authorId.toValue()).toEqual(commentInfo.authorId)
    expect(answerComment.content).toEqual(commentInfo.content)
  })
})
