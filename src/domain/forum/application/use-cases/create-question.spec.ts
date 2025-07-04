import { IQuestionRepository } from "../repositories/questions-repository"
import { CreateQuestionUseCase } from "./create-question"

class FakeQuestionsRepository implements IQuestionRepository {
  async create() {}
}
test("Create an answer", async () => {
  const questionsRepository = new FakeQuestionsRepository()
  const createQuestion = new CreateQuestionUseCase(questionsRepository)
  const questionInfo = {
    authorId: "1",
    content: "some con",
    title: "title",
  }
  const answer = await createQuestion.execute(questionInfo)

  expect(answer.question.authorId.toValue()).toEqual(questionInfo.authorId)
  expect(answer.question.title).toEqual(questionInfo.title)
  expect(answer.question.content).toEqual(questionInfo.content)
})
