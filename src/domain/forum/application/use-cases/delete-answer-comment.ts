import { failure, Result, success } from "@/core/result"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"

type DeleteAnswerCommentAnswerUseCaseRequest = {
  answerCommentId: string
  authorId: string
}

type DeleteAnswerCommentAnswerUseCaseResponse = Result<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private commentAnswersRepository: IAnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentAnswerUseCaseRequest): Promise<DeleteAnswerCommentAnswerUseCaseResponse> {
    const commentAnswer = await this.commentAnswersRepository.findById(answerCommentId)
    if (!commentAnswer) {
      return failure("CommentAnswer not found")
    }
    if (commentAnswer.authorId.toString() !== authorId) {
      return failure("Unauthorized")
    }
    await this.commentAnswersRepository.delete(commentAnswer)
    return success({})
  }
}
