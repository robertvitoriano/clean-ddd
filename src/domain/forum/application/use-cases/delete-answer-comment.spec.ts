import { makeAnswerComment } from "@/test/factories/make-anwer-comment"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment"
import { Failure } from "@/core/result"

let answerCommentsRepository: IAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase
beforeEach(() => {
  answerCommentsRepository = new InMemoryAnswerCommentsRepository()
  sut = new DeleteAnswerCommentUseCase(answerCommentsRepository)
})
describe("Delete answer", () => {
  it("Should be able to Delete a answer comment", async () => {
    const answerComment = makeAnswerComment({})
    await answerCommentsRepository.create(answerComment)
    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })
    const answerFound = await answerCommentsRepository.findById(answerComment.id.toString())
    expect(answerFound).toEqual(null)
  })
  it("Should not be  be able to Delete a answer comment from another author", async () => {
    const answerComment = makeAnswerComment({})
    await answerCommentsRepository.create(answerComment)
    
    const result = await  sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: "test",
      })
      
    expect(result).toBeInstanceOf(Failure)
    
  })
})
