import express, { Router } from 'express'
import Middleware from '../../../middleware/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import studentController from '../../../controller/institute/student/studentController'
const studentRouter:Router=express.Router()

studentRouter.route('/institute/student').post(Middleware.isLogin,studentController.createStudent)

export default studentRouter