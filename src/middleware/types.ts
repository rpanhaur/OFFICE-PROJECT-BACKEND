
import {Request} from 'express'

export interface IRequest extends Request{

  users?:{
    username:string,
    email:string,
    password:string
  }
}