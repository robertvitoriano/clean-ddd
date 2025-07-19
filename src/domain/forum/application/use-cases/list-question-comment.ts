import { failure, Result, success } from "@/core/result"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
export type ListQuestionCommentRequest = {
  questionId: string
  page: number
}

export type ListQuestionCommentResponse = Result<ResourceNotFoundError, { comments: Comment[] }>
export class ListQuestionCommentsUseCase {
  constructor(
    private readonly questionsRepository: IQuestionsRepository,
    private readonly commentsRepository: IQuestionCommentsRepository
  ) {}

  async execute({ questionId, page }: ListQuestionCommentRequest):Promise<ListQuestionCommentResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    const comments = await this.commentsRepository.findManyByQuestionId(questionId, {
      page,
      perPage: 10,
    })

    return success({comments})
  }
}
