import sequelize from "../../../database/connection";
import { IRequest } from "../../../middleware/types";
import {Request,Response} from 'express'

class teacherController{

  static async createTeacher(req:IRequest,res:Response){

    const instituteNumber=req.users?.currentInstituteNumber

    const {teacherName, teacherEmail , teacherPhoneNumber ,teacherSubject , teacherExperience}=req.body
    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherSubject || !teacherExperience){

      return res.status(400).json({
        message:"Please fill the teacherName, teacherEmail , teacherPhoneNumber ,teacherSubject , teacherExperience"
      })

    }

    await sequelize.query(`INSERT INTO teacher_${instituteNumber} (teacherEmail , teacherPhoneNumber ,teacherSubject , teacherExperience) VALUES(?,?,?,?)`,{
      replacements:[teacherName, teacherEmail , teacherPhoneNumber ,teacherSubject , teacherExperience]
    })

    res.status(201).json({
      message:`Congratulation Teacher table of institute_${instituteNumber} is Successfully Created`
    })

  }

  



}

export default teacherController