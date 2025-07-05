import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"

interface FindQuestionBySlugUseCaseRequest {
  slug:string
}
interface FindQuestionBySlugUseCaseResponse {
  question: Question | null
}

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    slug
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)
    return { question }
  }
}
