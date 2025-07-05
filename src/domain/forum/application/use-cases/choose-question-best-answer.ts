import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private questionsRepository: IQuestionsRepository
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error("Answer not found")
    }
    const question = await this.questionsRepository.findById(answer.questionId.toValue())
    if (!question) {
      throw new Error("Question not found")
    }
    if (question.authorId.toValue() !== authorId) {
      throw new Error("Not allowed")
    }
    question.bestAnswerId = answer.id
    await this.questionsRepository.save(question)

    return { question }
  }
}
