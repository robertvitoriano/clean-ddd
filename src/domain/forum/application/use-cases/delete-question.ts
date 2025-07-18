import { failure, Result, success } from "@/core/result"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId:string
}

type DeleteQuestionUseCaseResponse = Result<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    questionId,
    authorId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return failure(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    await this.questionsRepository.delete(question)
    return success({})
  }
}
