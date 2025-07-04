import { Question } from "../../enterprise/entities/question"
import { IQuestionRepository } from "../repositories/questions-repository"

interface FindQuestionBySlugUseCaseRequest {
  slug:string
}
interface FindQuestionBySlugUseCaseResponse {
  question: Question | null
}

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionRepository) {}
  async execute({
    slug
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)
    return { question }
  }
}
