import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase  {
  constructor(private answersRepository: IAnswersRepository) {
  }
  async execute({
    instructorId,
    content,
  }: AnswerQuestionUseCaseRequest):Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(instructorId),
    })
    await this.answersRepository.create(answer)
    return { answer }
  }
}
