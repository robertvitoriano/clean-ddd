import { Result, success } from "@/core/result"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"

interface FindQuestionBySlugUseCaseRequest {
  slug:string
}
type FindQuestionBySlugUseCaseResponse  = Result<null,{
  question: Question | null
}>

export class FindQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    slug
  }: FindQuestionBySlugUseCaseRequest): Promise<FindQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)
    return success({ question })
  }
}
