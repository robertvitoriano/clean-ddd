import { PaginationParams } from "@/core/repositories/pagination-params"
import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  async findManyRecent(params:PaginationParams): Promise<Question[]>{
    
    return this.questions
  }

  async save(question: Question): Promise<void> {
    const originalQuestionIndex = this.questions.findIndex(
      (q) => question.id.toValue() === q.id.toValue()
    )
    this.questions[originalQuestionIndex] = question
  }
  async delete(question: Question): Promise<void> {
    this.questions = this.questions.filter((item) => item.id !== question.id)
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
