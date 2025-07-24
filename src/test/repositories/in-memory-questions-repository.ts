import { PaginationParams } from "@/core/repositories/pagination-params"
import { IQuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository"
import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  
  constructor(
    private questionAttachmentsRepository: IQuestionAttachmentsRepository
  ){}
  async findManyRecent({ page, perPage }: PaginationParams): Promise<Question[]> {
    const offset = perPage * (page - 1)
    return this.questions
    .slice()
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(offset, offset + perPage)
  }

  async save(question: Question): Promise<void> {
    const originalQuestionIndex = this.questions.findIndex(
      (q) => question.id.toValue() === q.id.toValue()
    )
    this.questions[originalQuestionIndex] = question
  }
  async delete(question: Question): Promise<void> {
    this.questions = this.questions.filter((item) => item.id !== question.id)
    await this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toValue())
  }
  async findById(questionId: string): Promise<Question | null> {
    return this.questions.find((question) => question.id.toString() === questionId) || null
  }
  public questions: Question[] = []
  async create(question: Question) {
    this.questions.push(question)
  }
  async findBySlug(slug: string): Promise<Question | null> {
    return this.questions.find((question) => question.slug.value === slug) || null
  }
}
