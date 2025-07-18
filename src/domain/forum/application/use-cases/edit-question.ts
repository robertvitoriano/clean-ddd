import { title } from "process"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"
import { failure, Result, success } from "@/core/result"

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

type EditQuestionUseCaseResponse = Result<ResourceNotFoundError | NotAllowedError,{}> 

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return failure(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }
    question.title = title
    question.content = content
    await this.questionsRepository.save(question)

    return success({})
  }
}
