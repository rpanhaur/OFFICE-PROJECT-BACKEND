import { NextFunction,Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { IRequest } from "./types";
import jwt from 'jsonwebtoken'
import User from "../database/models/user.models";



class Middleware{

  static async isLogin(req:IRequest,res:Response,next:NextFunction){
    const token=req.headers.authorization
    console.log(token);
    
    if(!token){
      res.status(402).json({
        message:'Please login Again '
      })      
    }else{

      jwt.verify(token,process.env.JWT_SECRET_IN!,async(error:any,result:any)=>{

        if(error){
          res.status(402).json({
            message:'Login Fail '
          })
          return
        }



        const userData= await User.findByPk(result.id,{
          attributes:[]
        })
        
        
        if(!userData){
          res.status(402).json({
            message:'No user registered'
          })

        }else{
          req.users=userData
          next()
         
        }


      }

      )



    }
    

  }





}

export default Middleware