import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { failure, Result, success } from "@/core/result"

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}
export type ChooseQuestionBestAnswerUseCaseResponse = Result<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

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
      return failure(new ResourceNotFoundError())
    }
    const question = await this.questionsRepository.findById(answer.questionId.toValue())
    if (!question) {
      return failure(new ResourceNotFoundError())
    }
    if (question.authorId.toValue() !== authorId) {
      return failure(new NotAllowedError())
    }
    question.bestAnswerId = answer.id
    await this.questionsRepository.save(question)

    return success({ question })
  }
}
