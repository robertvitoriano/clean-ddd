import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { IAnswersRepository } from '../repositories/answers-repository'

class FakeAnswersRepository implements IAnswersRepository {
  async create() {}
}
test('Create an answer', () => {
  const answersRepository = new FakeAnswersRepository()
  const answerQuestion = new AnswerQuestionUseCase(answersRepository)
  const answer = answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
