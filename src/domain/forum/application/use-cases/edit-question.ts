import { title } from "process"
import { IQuestionRepository } from "../repositories/questions-repository"

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionRepository) {}
  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error("Question not found")
    }
    if (question.authorId.toString() !== authorId) {
      throw new Error("Unauthorized")
    }
    question.title = title
    question.content = content
    await this.questionsRepository.update(question)

    return {}
  }
}
