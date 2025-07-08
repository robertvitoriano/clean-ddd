import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";
import { IQuestionsRepository } from "../repositories/questions-repository";

export class ListQuestionCommentsUseCase {
  
  constructor(private readonly questionsRepository:IQuestionsRepository, private readonly commentsRepository:IQuestionCommentsRepository){}
  
  async execute(questionId:string, page:number){
    
    const question = await this.questionsRepository.findById(questionId)
    
    if(!question){
      throw new Error("Question not found!")
    }
    
    const comments = await this.commentsRepository.findManyByQuestionId(questionId,{page, perPage:10})
    
    return {comments}
    
  }
  
  
}
