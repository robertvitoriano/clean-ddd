import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId:string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}
  async execute({
    questionCommentId,
    authorId
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)
    if (!questionComment) {
      throw new Error("questionComment not found")
    }
    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Unauthorized")
    }
    await this.questionCommentRepository.delete(questionComment)
    return {}
  }
}
