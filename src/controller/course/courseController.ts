import sequelize from "../../database/connection";
import { IRequest } from "../../middleware/types";
import {Request,Response} from 'express'


class courseController{

  static async createCourse(req:IRequest,res:Response){
    const instituteNumber=req.users?.currentInstituteNumber
    console.log(instituteNumber,'heeeeeeeeeeeeeeeee');
    
    const{ courseName,coursePrice,courseDetails,courseDuration,courseLevel}=req.body

    if(!courseName || !coursePrice || !courseDetails || !courseDuration || !courseLevel){
      res.status(402).json({
        message:'Please provide  courseName,coursePrice,courseDetails,courseDuration,courseLevel'
      })
      return
    }
    console.log(instituteNumber);
    

    
    

    await sequelize.query(`INSERT INTO course_${instituteNumber}( courseName,coursePrice,courseDetails,courseDuration,courseLevel) VALUES(?,?,?,?,?)`,{
      replacements:[ courseName,coursePrice,courseDetails,courseDuration,courseLevel]
    })

  }







}

export default courseController