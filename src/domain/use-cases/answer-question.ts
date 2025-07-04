import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/entities/answer'
import { IAnswersRepository } from '@/domain/repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(instructorId),
    })
    this.answersRepository.create(answer)
    return answer
  }
}
