import { IAnswersRepository } from "../repositories/answers-repository";
import { IQuestionsRepository } from "../repositories/questions-repository";

export class ListQuestionAnswersUseCase {
  
  constructor(private readonly questionsRepository:IQuestionsRepository, private readonly answersRepository:IAnswersRepository){}
  
  async execute(questionId:string, page:number){
    
    const question = await this.questionsRepository.findById(questionId)
    
    if(!question){
      throw new Error("Question not found!")
    }
    
    const answers = await this.answersRepository.findManyByQuestionId(questionId,{page, perPage:10})
    
    return {answers}
    
  }
  
  
}
