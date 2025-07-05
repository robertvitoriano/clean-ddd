import { AnswerQuestionUseCase } from "./answer-question"
import { IAnswersRepository } from "../repositories/answers-repository"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { IQuestionsRepository } from "../repositories/questions-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { makeQuestion } from "@/test/factories/make-question"
import { makeAnswer } from "@/test/factories/make-answer"

let answersRepository: IAnswersRepository
let questionsRepository: IQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase
beforeEach(() => {
  answersRepository = new InMemoryAnswersRepository()
  questionsRepository = new InMemoryQuestionsRepository()
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

    expect(result.question.bestAnswerId?.toValue()).toEqual(answer.id.toValue())
  })
  it("Should not be able to choose question best answer", async () => {
    const question = makeQuestion({})
    const answer = makeAnswer({
      questionId: question.id,
    })
    questionsRepository.create(question)
    await answersRepository.create(answer)
    expect(
      sut.execute({
        answerId: answer.id.toValue(),
        authorId: "some-other-author",
      })
    ).rejects.toThrowError("Not allowed")
  })
})
