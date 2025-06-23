import sequelize from "../../../database/connection";
import { IRequest } from "../../../middleware/types";
import { Request,Response } from "express";

class studentController{

  static async createStudent(req:IRequest,res:Response){

    const instituteNumber=req.users?.currentInstituteNumber

    const{studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch}=req.body

    if(!studentName || !studentAddress || !studentPhone || !studentCourse || !studentEmail || !studentBatch){
       res.status(401).json({
        message:'Please fill the details studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch'
      })
      return
    }

    await sequelize.query(`INSERT INTO student_${instituteNumber} (studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch) VALUES(?,?,?,?,?,?)`,{
      replacements:[studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch]
    })

    res.status(202).json({
      message:`Congratulation Student Table of Institute_${instituteNumber} is Successfully Created`
    })



  }



}

export default studentController