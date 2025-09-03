import express, { Router } from "express";
import isLogin from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import { updatePerformance } from "../../controller/roster/roster-controller";

const updatePerformanceRouter: Router = express.Router()

updatePerformanceRouter.route('/roster/updatePerformance').post(isLogin, asyncErrorHandler(updatePerformance))

export default updatePerformanceRouter