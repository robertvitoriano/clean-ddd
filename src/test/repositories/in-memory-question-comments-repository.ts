import { PaginationParams } from "@/core/repositories/pagination-params"
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository {
  public questionComments: QuestionComment[] = []
  async create(questionComment: QuestionComment): Promise<void> {
    this.questionComments.push(questionComment)
  }
  async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.questionComments.findIndex(
      (item) => item.id.toValue() === questionComment.id.toValue()
    )
    this.questionComments.splice(questionCommentIndex, 1)
  }
  async findById(questioncommentId: string): Promise<QuestionComment | null> {
    return (
      this.questionComments.find(
        (questionComment) => questionComment.id.toValue() === questioncommentId
      ) || null
    )
  }
  save!: (questioncomment: QuestionComment) => Promise<void>
  findManyRecent!: (params: PaginationParams) => Promise<QuestionComment[]>
}
