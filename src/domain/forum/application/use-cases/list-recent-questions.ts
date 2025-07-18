import { Result, success } from "@/core/result"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"

interface ListRecentQuestionsCaseRequest {
  page: number
}
type ListRecentQuestionsCaseResponse = Result<
  null,
  {
    questions: Question[]
  }
>

export class ListRecentQuestionsCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    page,
  }: ListRecentQuestionsCaseRequest): Promise<ListRecentQuestionsCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
      perPage: 10,
    })
    return success({ questions })
  }
}
