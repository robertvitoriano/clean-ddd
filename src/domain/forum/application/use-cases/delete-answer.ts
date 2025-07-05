import { IAnswersRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId:string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}
  async execute({
    answerId,
    authorId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.answersRepository.findById(answerId)
    if (!Answer) {
      throw new Error("Answer not found")
    }
    if (Answer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized")
    }
    await this.answersRepository.delete(Answer)
    return {}
  }
}
