import express, { Router } from 'express'

import AuthController from '../controller/globals/auth/authController'
import asyncErrorHandler from '../services/asyncErrorHandler'
const router: Router = express.Router()

router.route('/register').post(AuthController.registerUser)
router.route('/login').post(AuthController.loginUser)
router.route('/users').get(AuthController.getAllUsers)
router.route('/users/:id').delete(asyncErrorHandler(AuthController.deleteUser))

export default router