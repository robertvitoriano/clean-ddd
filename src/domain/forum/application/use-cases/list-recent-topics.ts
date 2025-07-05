import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"

interface ListRecentQuestionsCaseRequest {
  slug: string
}
interface ListRecentQuestionsCaseResponse {
  questions: Question[]
}

export class ListRecentQuestionsCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    slug,
  }: ListRecentQuestionsCaseRequest): Promise<ListRecentQuestionsCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page: 1,
      perPage: 10,
    })
    return { questions }
  }
}
