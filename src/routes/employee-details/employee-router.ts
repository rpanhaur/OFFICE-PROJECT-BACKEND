import express, { Router } from 'express'



import isLogin from '../../middleware/middleware'
import employeeController from '../../controller/employee-details/employe-details-controller'
import asyncErrorHandler from '../../services/asyncErrorHandler'


const employeeRouter: Router = express.Router()

employeeRouter.route('/employee').post(isLogin, asyncErrorHandler(employeeController.createEmployee))



export default employeeRouter