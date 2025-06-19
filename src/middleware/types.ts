import { Request } from "express";

export interface IRequest extends Request {
  users?: {
    id: string,
       
    currentInstituteNumber?:string | number
     
   
  } 
 
 





 
  
}
