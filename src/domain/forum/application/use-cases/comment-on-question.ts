import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}
interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository, private questionCommentsRepository:IQuestionCommentsRepository) {}
  async execute({
    questionId,
    content,
    authorId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    
    const question  = await this.questionsRepository.findById(questionId)
    
    if(!question){
      throw new Error("Question not found")
    }
    const questionComment = QuestionComment.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.questionCommentsRepository.create(questionComment)
    return { questionComment }
  }
}
