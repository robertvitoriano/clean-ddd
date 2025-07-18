import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { IAnswersRepository } from "../repositories/answers-repository"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { failure, Result, success } from "@/core/result"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
type CommentOnAnswerUseCaseResponse  = Result<ResourceNotFoundError,{
  answerComment: AnswerComment
}>

export class CommentOnAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository, private answerCommentsRepository:IAnswerCommentsRepository) {}
  async execute({
    answerId,
    content,
    authorId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    
    const answer  = await this.answersRepository.findById(answerId)
    
    if(!answer){
      return failure(new ResourceNotFoundError())
    }
    const answerComment = AnswerComment.create({
      content,
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
    })
    await this.answerCommentsRepository.create(answerComment)
    return success({ answerComment })
  }
}
