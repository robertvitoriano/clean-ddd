import { AnswerQuestionUseCase } from "./answer-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { makeAnswer } from "@/test/factories/make-answer"
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository"
import { IQuestionAttachmentsRepository } from "../repositories/question-attachments-repository"

let sut: ChooseQuestionBestAnswerUseCase
let answersRepository: IAnswersRepository
let questionsRepository: IQuestionsRepository
let questionAttachmentsRepository: IQuestionAttachmentsRepository
beforeEach(() => {
  questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
  questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
  answersRepository = new InMemoryAnswersRepository()
  sut = new ChooseQuestionBestAnswerUseCase(answersRepository, questionsRepository)
})
describe("Chose question best answer", () => {
  it("Should be able to choose question best answer", async () => {
    const question = makeQuestion({})
    const answer = makeAnswer({
      questionId: question.id,
    })

    questionsRepository.create(question)
    answersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: question.authorId.toValue(),
    })

    expect(result.isSuccess()).toBe(true)
    
    if (!result.isSuccess()) throw new Error("Expected result to be success")

    expect(result.value.question.bestAnswerId?.toValue()).toEqual(answer.id.toValue())
  })

  it("Should not be able to choose question best answer of a question from other author", async () => {
    const question = makeQuestion({})
    const answer = makeAnswer({
      questionId: question.id,
    })
    questionsRepository.create(question)
    await answersRepository.create(answer)
    const result = await sut.execute({
      answerId: answer.id.toValue(),
      authorId: "some-other-author",
    })

    expect(result)
  })
})
