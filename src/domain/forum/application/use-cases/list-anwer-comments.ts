import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { IAnswersRepository } from "../repositories/answers-repository";

export class ListAnswerCommentsUseCase {
  
  constructor(private readonly answersRepository:IAnswersRepository, private readonly commentsRepository:IAnswerCommentsRepository){}
  
  async execute(answerId:string, page:number){
    
    const answer = await this.answersRepository.findById(answerId)
    
    if(!answer){
      throw new Error("Answer not found!")
    }
    
    const comments = await this.commentsRepository.findManyByAnswerId(answerId,{page, perPage:10})
    
    return {comments}
    
  }
  
  
}
