import express, { Router } from 'express'
import instituteController from '../../controller/institute/instituteController'
const instituteRouter:Router=express.Router()

instituteRouter.route('/institute').post(instituteController.createInstitute)



export default instituteRouter