import express, { Router } from  'express'
import Middleware from '../../../middleware/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import teacherController from '../../../controller/institute/teacher/teacherController'

const teacherRouter:Router=express.Router()

teacherRouter.route('/institute/teacher').post(Middleware.isLogin,asyncErrorHandler(teacherController.createTeacher))


export default teacherRouter