import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { Result, success } from "@/core/result"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}
type CreateQuestionUseCaseResponse = Result<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}
  async execute({
    authorId,
    title,
    content,
    attachmentIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    
    const question = Question.create({
      content,
      authorId: new UniqueEntityId(authorId),
      title,
    })
    
    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })
    
     question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)
    return success({ question })
  }
}
