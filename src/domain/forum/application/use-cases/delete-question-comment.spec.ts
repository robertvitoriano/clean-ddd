import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { makeQuestionComment } from "@/test/factories/make-question-comment"

let questionCommentsRepository: IQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase
beforeEach(() => {
  questionCommentsRepository = new InMemoryQuestionCommentsRepository()
  sut = new DeleteQuestionCommentUseCase(questionCommentsRepository)
})
describe("Delete question", () => {
  it("Should be able to Delete a question comment", async () => {
    const questionComment = makeQuestionComment({})
    await questionCommentsRepository.create(questionComment)
    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })
    const questionFound = await questionCommentsRepository.findById(questionComment.id.toString())
    expect(questionFound).toEqual(null)
  })
  it("Should not be  be able to Delete a question comment from another author", async () => {
    const questionComment = makeQuestionComment({})
    await questionCommentsRepository.create(questionComment)

    const result = await sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: "test",
      })
      
    expect(result.isFailure()).toBe(true)
  })
})
