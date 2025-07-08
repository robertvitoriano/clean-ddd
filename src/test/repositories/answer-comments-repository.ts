import { PaginationParams } from "@/core/repositories/pagination-params";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements IAnswerCommentsRepository{
  public answerComments:AnswerComment[] = []
  async create(answerComment: AnswerComment):Promise<void>{
    this.answerComments.push(answerComment)
  }
  findBySlug!: (slug: string) => Promise<AnswerComment | null>;
  delete!: (AnswerComment: AnswerComment) => Promise<void>;
  save!: (answerComment: AnswerComment) => Promise<void>;
  findById!: (answerCommentId: string) => Promise<AnswerComment | null>;
  findManyRecent!: (params: PaginationParams) => Promise<AnswerComment[]>;
  
}
