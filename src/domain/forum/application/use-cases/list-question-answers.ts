import { failure, Result, success } from "@/core/result"
import { IAnswersRepository } from "../repositories/answers-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { Answer } from "../../enterprise/entities/answer"
export type ListQuestionAnswersRequest = {
  questionId: string
  page: number
}

export type ListQuestionAnswersResponse = Result<ResourceNotFoundError, { answers: Answer[] }>
export class ListQuestionAnswersUseCase {
  constructor(
    private readonly questionsRepository: IQuestionsRepository,
    private readonly answersRepository: IAnswersRepository
  ) {}

  async execute({ questionId, page }: ListQuestionAnswersRequest):Promise<ListQuestionAnswersResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    const answers = await this.answersRepository.findManyByQuestionId(questionId, {
      page,
      perPage: 10,
    })

    return success({ answers })
  }
}
