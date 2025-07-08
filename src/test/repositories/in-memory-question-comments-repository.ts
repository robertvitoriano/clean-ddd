import { PaginationParams } from "@/core/repositories/pagination-params";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository{
  public questionComments:QuestionComment[] = []
  async create(questionComment: QuestionComment):Promise<void>{
    this.questionComments.push(questionComment)
  }  
  findBySlug!: (slug: string) => Promise<QuestionComment | null>;
  delete!: (questioncomment: QuestionComment) => Promise<void>;
  save!: (questioncomment: QuestionComment) => Promise<void>;
  findById!: (questioncommentId: string) => Promise<QuestionComment | null>;
  findManyRecent!: (params: PaginationParams) => Promise<QuestionComment[]>;
  
}
