import { IQuestionRepository } from "../repositories/questions-repository"

interface DeleteQuestionUseCaseRequest {
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionRepository) {}
  async execute({
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error("Question not found")
    }
    await this.questionsRepository.delete(question)
    return {}
  }
}
