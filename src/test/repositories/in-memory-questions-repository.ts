import { IQuestionRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements IQuestionRepository {
  async delete(question: Question): Promise<void> {
    this.questions = this.questions.filter(item => item.id !== question.id)
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
