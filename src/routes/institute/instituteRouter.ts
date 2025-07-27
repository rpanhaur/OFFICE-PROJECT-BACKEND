import express, { Router } from 'express'

import instituteController from '../../controller/institute/instituteController'
import Middleware from '../../middleware/middleware'
import asyncErrorHandler from '../../services/asyncErrorHandler'


const instituteRouter: Router = express.Router()

instituteRouter.route('/institute').post(Middleware.isLogin, instituteController.createInstitute, instituteController.createTeacher, instituteController.createStudent, instituteController.createCourse, asyncErrorHandler(instituteController.createCategory))



export default instituteRouter