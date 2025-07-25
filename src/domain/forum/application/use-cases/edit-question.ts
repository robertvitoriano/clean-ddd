import { title } from "process"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"
import { failure, Result, success } from "@/core/result"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentIds: string[]
}

type EditQuestionUseCaseResponse = Result<ResourceNotFoundError | NotAllowedError, {}>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository
  ) {}
  async execute({
    questionId,
    authorId,
    content,
    title,
    attachmentIds
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return failure(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })
    
    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content
    await this.questionsRepository.save(question)

    return success({})
  }
}
