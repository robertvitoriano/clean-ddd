import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository"
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

let questionsRepository: IQuestionsRepository
let questionCommentsRepository: IQuestionCommentsRepository
let sut: CommentOnQuestionUseCase
beforeEach(() => {
  questionsRepository = new InMemoryQuestionsRepository()
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
    const {questionComment }= await sut.execute(commentInfo)

    expect(questionComment.authorId.toValue()).toEqual(commentInfo.authorId)
    expect(questionComment.content).toEqual(commentInfo.content)
  })
})
