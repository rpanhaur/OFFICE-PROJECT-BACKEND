import express, { Router } from "express";
import isLogin from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import { assignShift } from "../../controller/roster/roster-controller";

const assignShiftRouter: Router = express.Router()

assignShiftRouter.route('/roster/assignShift').post(isLogin, asyncErrorHandler(assignShift))

export default assignShiftRouter