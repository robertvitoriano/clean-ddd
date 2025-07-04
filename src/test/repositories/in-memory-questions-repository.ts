import { IQuestionRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements IQuestionRepository {
  public questions: Question[] = []
  async create(question: Question) {
    this.questions.push(question)
  }
  
}
