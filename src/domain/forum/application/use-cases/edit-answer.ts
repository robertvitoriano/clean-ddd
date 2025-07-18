import { failure, Result, success } from "@/core/result"
import { IAnswersRepository } from "../repositories/answers-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

type EditAnswerUseCaseResponse =  Result<NotAllowedError| ResourceNotFoundError,{}> 

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return failure(new ResourceNotFoundError())
    }
    if (answer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    answer.content = content
    await this.answersRepository.save(answer)

    return success({})
  }
}
