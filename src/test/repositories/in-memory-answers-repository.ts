import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements IAnswersRepository {
  public answers: Answer[] = []
  async delete(answerToDelete: Answer): Promise<void> {
    this.answers = this.answers.filter(
      (answer) => answer.id.toValue() !== answerToDelete.id.toValue()
    )
  }
  async save(answer: Answer): Promise<void> {
    const originalAnswerIndex = this.answers.findIndex(
      (q) => answer.id.toValue() === q.id.toValue()
    )
    this.answers[originalAnswerIndex] = answer
  }
  async findById(answerId: string): Promise<Answer | null> {
    return this.answers.find((answer) => answer.id.toValue() === answerId) || null
  }
  async create(answer: Answer) {
    this.answers.push(answer)
  }
}
