import express, { Router } from "express";
import isLogin from "../../middleware/middleware";
import { createRoster } from "../../controller/roster/roster-controller";
import asyncErrorHandler from "../../services/asyncErrorHandler";

const createRosterRouter: Router = express.Router()

createRosterRouter.route('/roster/create').post(isLogin, asyncErrorHandler(createRoster))

export default createRosterRouter