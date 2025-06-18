import express, { Router } from 'express'
import asyncErrorHandler from '../../services/asyncErrorHandler'
import courseController from '../../controller/course/courseController'
const courseRouter:Router=express.Router()

courseRouter.route('/course').post(asyncErrorHandler(courseController.createCourse))



export default courseRouter