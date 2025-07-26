import sequelize from "../../../database/connection";
import { IRequest } from "../../../middleware/types";
import { Request, Response } from 'express'


class courseController {

  static async createCourse(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber


    const { courseName, coursePrice, courseDetails, courseDuration, courseLevel } = req.body

    if (!courseName || !coursePrice || !courseDetails || !courseDuration || !courseLevel) {
      res.status(402).json({
        message: 'Please provide  courseName,coursePrice,courseDetails,courseDuration,courseLevel'
      })
      return
    }



    await sequelize.query(`INSERT INTO course_${instituteNumber}( courseName,coursePrice,courseDetails,courseDuration,courseLevel) VALUES(?,?,?,?,?)`, {
      replacements: [courseName, coursePrice, courseDetails, courseDuration, courseLevel]
    })

    res.status(201).json({
      message: `Course of This Institute is Successfully Created  !! Welcome to our Institute_${instituteNumber}`
    })

  }

  static async deleteCourse(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const courseId = req.params.id

    const courseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`, {
      replacements: [courseId]
    })

    if (courseData[0].length > 0) {

      await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id=?`, {
        replacements: [courseId]
      })


    }



    res.status(200).json({
      message: 'Course is Successfully Deleted'
    })
  }

  static async fetchCourse(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const couresData = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)

    res.status(200).json({
      message: 'Course is successfully fetched ',
      data: couresData
    })
  }


  static async singleCourse(req: IRequest, res: Response) {
    const instituteNumber = req.users?.currentInstituteNumber
    const courseId = req.params.id
    const singleCourseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id=?`, {
      replacements: [courseId]
    })
    res.status(200).json({
      message: 'Single course Data is fetched Successfully',
      data: singleCourseData
    })
  }









}

export default courseController