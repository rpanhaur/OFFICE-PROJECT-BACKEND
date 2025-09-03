import express, { Router } from "express";
import isLogin from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import { getMonthlyPerformance } from "../../controller/roster/roster-controller";

const monthlyPerformanceRouter: Router = express.Router()

monthlyPerformanceRouter.route('/roster/monthlyPerformance').post(isLogin, asyncErrorHandler(getMonthlyPerformance))

export default monthlyPerformanceRouter