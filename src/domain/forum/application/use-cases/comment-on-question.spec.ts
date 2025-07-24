import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"

let sut: CommentOnQuestionUseCase
let questionCommentsRepository: IQuestionCommentsRepository
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  questionCommentsRepository = new InMemoryQuestionCommentsRepository()
  
  sut = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
  
})
describe("COmment on a question", () => {
  it("SHould be able to comment on a question ", async () => {
    const question = makeQuestion({})
    await questionsRepository.create(question)
    const commentInfo = {
      authorId:'myid',
      content:'first comment',
      questionId: question.id.toValue(),
    }
    const result = await sut.execute(commentInfo)

    expect(result.value.questionComment.authorId.toValue()).toEqual(commentInfo.authorId)
    expect(result.value.questionComment.content).toEqual(commentInfo.content)
  })
})
