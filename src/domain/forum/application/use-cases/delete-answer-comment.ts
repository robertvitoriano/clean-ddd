import { failure, Result, success } from "@/core/result"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

type DeleteAnswerCommentAnswerUseCaseRequest = {
  answerCommentId: string
  authorId: string
}

type DeleteAnswerCommentAnswerUseCaseResponse = Result<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private commentAnswersRepository: IAnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentAnswerUseCaseRequest): Promise<DeleteAnswerCommentAnswerUseCaseResponse> {
    const commentAnswer = await this.commentAnswersRepository.findById(answerCommentId)
    if (!commentAnswer) {
      return failure(new ResourceNotFoundError())
    }
    if (commentAnswer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    await this.commentAnswersRepository.delete(commentAnswer)
    return success({})
  }
}
