import { failure, Result, success } from "@/core/result"
import { AnswerCommentProps } from "../../enterprise/entities/answer-comment"
import { Comment } from "../../enterprise/entities/comment"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { IAnswersRepository } from "../repositories/answers-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
export type ListAnswerCommentsRequest = {
  answerId: string
  page: number
}

export type ListAnswerCommentsResponse = Result<
  ResourceNotFoundError,
  { comments: Comment<AnswerCommentProps>[] }
>
export class ListAnswerCommentsUseCase {
  constructor(
    private readonly answersRepository: IAnswersRepository,
    private readonly commentsRepository: IAnswerCommentsRepository
  ) {}

  async execute({
    page,
    answerId,
  }: ListAnswerCommentsRequest): Promise<ListAnswerCommentsResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    const comments = await this.commentsRepository.findManyByAnswerId(answerId, {
      page,
      perPage: 10,
    })

    return success({ comments })
  }
}
