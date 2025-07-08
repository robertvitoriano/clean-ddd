import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentAnswerUseCaseRequest {
  answerCommentId: string
  authorId:string
}

interface DeleteAnswerCommentAnswerUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private commentAnswersRepository: IAnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId
  }: DeleteAnswerCommentAnswerUseCaseRequest): Promise<DeleteAnswerCommentAnswerUseCaseResponse> {
    const commentAnswer = await this.commentAnswersRepository.findById(answerCommentId)
    if (!commentAnswer) {
      throw new Error("CommentAnswer not found")
    }
    if (commentAnswer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized")
    }
    await this.commentAnswersRepository.delete(commentAnswer)
    return {}
  }
}
