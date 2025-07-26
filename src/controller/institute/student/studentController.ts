import sequelize from "../../../database/connection";
import { IRequest } from "../../../middleware/types";
import { Request, Response } from "express";

class studentController {

  static async createStudent(req: IRequest, res: Response) {

    const instituteNumber = req.users?.currentInstituteNumber

    const { studentName, studentAddress, studentPhone, studentCourse, studentEmail, studentBatch } = req.body

    if (!studentName || !studentAddress || !studentPhone || !studentCourse || !studentEmail || !studentBatch) {
      res.status(401).json({
        message: 'Please fill the details studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch'
      })
      return
    }

    await sequelize.query(`INSERT INTO student_${instituteNumber} (studentName,studentAddress,studentPhone,studentCourse,studentEmail,studentBatch) VALUES(?,?,?,?,?,?)`, {
      replacements: [studentName, studentAddress, studentPhone, studentCourse, studentEmail, studentBatch]
    })

    res.status(202).json({
      message: `Congratulation Student Table of Institute_${instituteNumber} is Successfully Created`
    })



  }

  static async deleteStudent(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const StudentId = req.params.id
    const studentData = await sequelize.query(`SELCECT * FROM student_${instituteNumber} WHERE id=?`, {
      replacements: [StudentId]
    })
    if (studentData[0].length > 0) {
      await sequelize.query(`DELETE FROM student_${instituteNumber} WHERE id=?`, {
        replacements: [StudentId]
      })
    }
    res.status(200).json({
      message: 'Students is successfully Delted'
    })
  }

  static async fetchStudent(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const studentData = await sequelize.query(`SELECT * FROM student_${instituteNumber}`)
    res.status(200).json({
      data: studentData,
      message: "Student Data are successfully fetched "
    })
  }


}

export default studentController