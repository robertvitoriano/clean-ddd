import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { IAnswersRepository } from "../repositories/answers-repository"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository, private answerCommentsRepository:IAnswerCommentsRepository) {}
  async execute({
    answerId,
    content,
    authorId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    
    const answer  = await this.answersRepository.findById(answerId)
    
    if(!answer){
      throw new Error("Answer not found")
    }
    const answerComment = AnswerComment.create({
      content,
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
    })
    await this.answerCommentsRepository.create(answerComment)
    return { answerComment }
  }
}
