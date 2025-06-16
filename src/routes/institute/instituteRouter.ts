import express, { Router } from 'express'

import instituteController from '../../controller/institute/instituteController'
import Middleware from '../../middleware/middleware'


const instituteRouter:Router=express.Router()

instituteRouter.route('/institute').post(Middleware.isLogin,instituteController.createInstitute,instituteController.createTeacher)



export default instituteRouter