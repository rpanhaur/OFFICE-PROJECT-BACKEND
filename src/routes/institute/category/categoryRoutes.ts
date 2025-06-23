import express, { Router } from 'express'
import categoryController from '../../../controller/institute/category/categoryController'
import Middleware from '../../../middleware/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'



const categoryRouter:Router=express.Router()

categoryRouter.route('/category').post(Middleware.isLogin,asyncErrorHandler(categoryController.createCategory)).get(Middleware.isLogin,asyncErrorHandler(categoryController.getCategory))

categoryRouter.route('/category/:id').delete(Middleware.isLogin,asyncErrorHandler(categoryController.deleteCategory))


export default categoryRouter