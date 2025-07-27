import express, { Router } from 'express'

import AuthController from '../controller/globals/auth/authController'
const router: Router = express.Router()

router.route('/auth/register').post(AuthController.registerUser)
router.route('/auth/login').post(AuthController.loginUser)

export default router