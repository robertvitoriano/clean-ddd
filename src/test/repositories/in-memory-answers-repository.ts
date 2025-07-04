import { IAnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements IAnswersRepository {
  public answers: Answer[] = []
  async create(answer: Answer) {
    this.answers.push(answer)
  }
}
