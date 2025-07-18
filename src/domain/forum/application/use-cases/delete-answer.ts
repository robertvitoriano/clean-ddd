import { failure, Result, success } from "@/core/result"
import { IAnswersRepository } from "../repositories/answers-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId:string
}

type DeleteAnswerUseCaseResponse  = Result<ResourceNotFoundError | NotAllowedError,{}>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute({
    answerId,
    authorId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.answersRepository.findById(answerId)
    if (!Answer) {
      return failure(new ResourceNotFoundError())
    }
    if (Answer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    await this.answersRepository.delete(Answer)
    return success({})
  }
}
