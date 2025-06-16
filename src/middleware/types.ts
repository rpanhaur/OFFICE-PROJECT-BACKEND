import { Request } from "express";

export interface IRequest extends Request {
  users?: {
    id: string,
    userName: string,
    email: string,
    password: string,
    currentInstituteNumber:string
   
  },
  instituteNumber?:string | number
  
}
