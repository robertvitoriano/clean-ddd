import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { Result, success } from "@/core/result"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}
type CreateQuestionUseCaseResponse = Result<null,{
  question: Question
}> 

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityId(authorId),
      title,
    })
    await this.questionsRepository.create(question)
    return success({ question })
  }
}
