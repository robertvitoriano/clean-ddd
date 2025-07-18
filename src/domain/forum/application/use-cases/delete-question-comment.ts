import { failure, Result, success } from "@/core/result"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

type DeleteQuestionCommentUseCaseResponse = Result<NotAllowedError | ResourceNotFoundError, {}>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}
  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)
    if (!questionComment) {
      return failure(new ResourceNotFoundError())
    }
    if (questionComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    await this.questionCommentRepository.delete(questionComment)
    return success({})
  }
}
