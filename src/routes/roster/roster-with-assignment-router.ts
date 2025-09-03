import express, { Router } from "express";
import isLogin from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import { getRosterWithAssignments } from "../../controller/roster/roster-controller";

const rosterWithAssignment: Router = express.Router()

rosterWithAssignment.route('/roster/rosterWithAssignment').post(isLogin, asyncErrorHandler(getRosterWithAssignments))

export default rosterWithAssignment