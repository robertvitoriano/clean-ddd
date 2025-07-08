import { PaginationParams } from "@/core/repositories/pagination-params";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements IAnswerCommentsRepository{
  async findManyByAnswerId (answerId: string, {page, perPage}: PaginationParams):Promise<AnswerComment[]>{
    const offset = perPage * (page - 1)
    return this.answerComments
    .filter(comment => comment.answerId.toValue() ===answerId)
    .slice(offset, offset + perPage)
  };
  public answerComments:AnswerComment[] = []
  async create(answerComment: AnswerComment):Promise<void>{
    this.answerComments.push(answerComment)
  }
  findBySlug!: (slug: string) => Promise<AnswerComment | null>;
  save!: (answerComment: AnswerComment) => Promise<void>;
  findManyRecent!: (params: PaginationParams) => Promise<AnswerComment[]>;
  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.answerComments.findIndex(
      (item) => item.id.toValue() === answerComment.id.toValue()
    )
    this.answerComments.splice(answerCommentIndex, 1)
  }
  async findById(answercommentId: string): Promise<AnswerComment | null> {
    return (
      this.answerComments.find(
        (answerComment) => answerComment.id.toValue() === answercommentId
      ) || null
    )
  }
  
}
