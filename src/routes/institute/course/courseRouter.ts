import express, { Router } from 'express'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import courseController from '../../../controller/institute/course/courseController'
const courseRouter:Router=express.Router()

import Middleware from '../../../middleware/middleware'

courseRouter.route('/institute/course').post(Middleware.isLogin,asyncErrorHandler(courseController.createCourse))



export default courseRouter